from flask import request, redirect, url_for, render_template, flash, session, jsonify
from miyachan import app, db
from miyachan.setting import setting
from miyachan.models.pay_table import Pay
from datetime import date
from calendar import monthrange
from dateutil.relativedelta import relativedelta
from numpy import sum, cumsum
from functools import wraps
from hashlib import sha512
import random, string
from math import floor

def login_check(f):
    @wraps(f)
    def inner(*args, **kwargs):
        if not session.get('logged_in'):
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return inner

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if session.get('challenge_id') and session.get('challenge_pass'):
            challenge_id = session.get('challenge_id')
            correct_id = challenge_id + app.config['USERNAME']
            hash_id = sha512(str(correct_id).encode('utf-8')).hexdigest()
            session.pop('challenge_id', None)
            challenge_pass = session.get('challenge_pass')
            correct_pass = challenge_pass + app.config['PASSWORD']
            hash_pass = sha512(str(correct_pass).encode('utf-8')).hexdigest()
            session.pop('challenge_pass', None)
            if hash_id == request.form['hidden_id'] and hash_pass == request.form['hidden_pass']:
                session['logged_in'] = True
                flash('ログインしました')
                return redirect(url_for('toroku'))
            else:
                flash('ログインに失敗しました')
    challeId = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
    session['challenge_id'] = challeId
    challePW = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
    session['challenge_pass'] = challePW
    return render_template('login.html', challeId=challeId, challePW=challePW)

@app.route('/')
@login_check
def toroku():
    return render_template('index.html', paykbns=setting.PayKbn, stores=setting.Store, users=setting.User, today=date.today())

@app.route('/add', methods=['POST'])
@login_check
def add_pay():
    pay = Pay(paydate=request.form['pay_date'], paykbn=request.form['pay_kbn'], store=request.form['store'], payer=request.form['user'], money=request.form['money'])
    db.session.add(pay)
    db.session.commit()
    flash('登録が完了しました')
    return redirect(url_for('toroku'))

@app.route('/list')
@login_check
def ichiran():
    return redirect(url_for('ichiranSelectMonth', year=date.today().year, month=date.today().month))

@app.route('/list/<int:year>/<int:month>', methods=['GET'])
@login_check
def ichiranSelectMonth(year, month):
    month_start = date(year=year, month=month, day=1)
    month_end = month_start.replace(day=monthrange(month_start.year, month_start.month)[1])
    one_month_after = month_start + relativedelta(months=1)
    one_month_ago = month_start - relativedelta(months=1)
    pays = Pay.query.filter(Pay.paydate>=one_month_ago).filter(Pay.paydate<=month_end).order_by(Pay.paydate.asc()).all()
    dicPay = {i+1:0 for i in range(31)}
    dicPay_before = {i+1:0 for i in range(31)}
    for pay in pays:
        if pay.paydate >= month_start:
            dicPay[pay.paydate.day] += pay.money
        else:
            dicPay_before[pay.paydate.day] += pay.money
    avg = sum(list(dicPay.values())) / setting.Family
    payData = [i for i in cumsum(list(dicPay.values()))]
    payData_before = [i for i in cumsum(list(dicPay_before.values()))]
    return render_template('list.html', pays=pays, month_start=month_start, one_month_after=one_month_after, one_month_ago=one_month_ago, avg=avg, data=payData, data_before=payData_before, users=setting.User)   

@app.route('/edit', methods=['POST'])
@login_check
def edit_pay():
    pay = Pay.query.get(request.form['pay_id'])
    return render_template('edit.html', paykbns=setting.PayKbn, stores=setting.Store, users=setting.User, pay=pay)

@app.route('/update/<int:id>', methods=['POST'])
@login_check
def update_pay(id):
    pay = Pay.query.get(id)
    pay.paydate = request.form['pay_date']
    pay.paykbn = request.form['pay_kbn']
    pay.payer = request.form['user']
    pay.store = request.form['store']
    pay.money = request.form['money']
    db.session.merge(pay)
    db.session.commit()
    flash('更新が完了しました')
    return redirect(url_for('ichiran'))

@app.route('/delete/<int:id>', methods=['GET'])
@login_check
def delete_pay(id):
    pay = Pay.query.get(id)
    db.session.delete(pay)
    db.session.commit()
    flash('削除が完了しました')
    return redirect(url_for('ichiran'))

@app.route('/setting')
@login_check
def setting_info():
    return render_template('setting.html' ,family_num=setting.Family)

@app.route('/setting/update', methods=['POST'])
@login_check
def update_setting():
    setting.updateFamily(request.form['family'])
    flash('設定を変更しました')
    return redirect(url_for('setting_info'))

@app.route('/analysis/today')
@login_check
def analysis_today():
    return redirect(url_for('analysis', year=date.today().year, month=date.today().month))

@app.route('/analysis/<int:year>/<int:month>')
@login_check
def analysis(year, month):
    month_start = date(year=year, month=month, day=1)
    month_end = month_start.replace(day=monthrange(month_start.year, month_start.month)[1])
    one_month_after = month_start + relativedelta(months=1)
    one_month_ago = month_start - relativedelta(months=1)
    pays = Pay.query.filter(Pay.paydate>=month_start).filter(Pay.paydate<=month_end).all()
    dict_pay_user = { value:0 for value in setting.User.values() }
    dict_pay_store = { value:0 for value in setting.Store.values() }
    for pay in pays:
        dict_pay_user[pay.getUser()] += pay.money
        dict_pay_store[pay.getStore()] += pay.money
    user_data = sorted(dict_pay_user.items(), key=lambda x:-x[1])
    store_data = sorted(dict_pay_store.items(), key=lambda x:-x[1])
    total = sum([i[1] for i in user_data])
    user_label = [i[0]+'({:.0f}'.format((i[1]*100/total) if total != 0 else 0)+'%)' for i in user_data]
    return render_template('analysis.html', month_start=month_start, one_month_ago=one_month_ago, one_month_after=one_month_after, user_label=user_label, user_data=[i[1] for i in user_data], store_label=[i[0] for i in store_data[:5]], store_data=[i[1] for i in store_data[:5]])

@app.route('/api/calc', methods=['POST'])
@login_check
def api_calc():
    total8 = 0
    total10 = 0
    post_dataset = request.json
    for post_data in post_dataset:
        if post_data['rate'] == '8':
            total8 += post_data['price']
        elif post_data['rate'] == '10':
            total10 += post_data['price']
    total = floor(total8 * 1.08) + floor(total10 * 1.1)
    return jsonify({'total': total})