DEBUG = False
SECRET_KEY = 'fl7L7NPNPhhzJJnfPnNoQrnxvwuchsVT'

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
        'user': 'yabuuchi',
        'password': 'kakeiboApp',
        'host': 'localhost',
        'db_name': 'kakeibo'
    })
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = False

USERNAME = 'Miya'
PASSWORD = 'nekosuna'
