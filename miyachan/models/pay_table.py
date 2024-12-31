from miyachan import db
from miyachan.setting import setting

class Pay(db.Model):
    __tablename__ = 'siharai'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    paydate = db.Column(db.Date, nullable=False)
    paykbn = db.Column(db.Integer, nullable=False)
    payer = db.Column(db.Integer, nullable=False)
    store = db.Column(db.Integer, nullable=False)
    money = db.Column(db.Float, nullable=False)
    
    def __init__(self, paydate=None, paykbn=None, payer=None, store=None, money=None):
        self.paydate = paydate
        self.paykbn = paykbn
        self.payer = payer
        self.store = store
        self.money = money
    
    def getPayKbn(self):
        return setting.PayKbn[str(self.paykbn)]
    
    def getStore(self):
        return setting.Store[str(self.store)]
    
    def getUser(self):
        return setting.User[str(self.payer)]
    
    def getDate(self):
        return str(self.paydate.month) + '/' + str(self.paydate.day)
    
    def getMoney(self):
        return '{:,.0f}'.format(self.money)
    
    def getMoneyNoneComma(self):
        return '{:.0f}'.format(self.money)