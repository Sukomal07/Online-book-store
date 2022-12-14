from flask import Flask, render_template, request, redirect, url_for, session , jsonify
from http import HTTPStatus
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
import json



app = Flask(__name__)
app.secret_key = 'xyzsdfg'

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '9073'
app.config['MYSQL_DB'] = 'user'

mysql = MySQL(app)

@app.route('/')
def home():
    with open('static/json/top_books.json') as json_file:
        data1 = json.load(json_file)
    with open('static/json/new_books.json') as json_file:
        data2 = json.load(json_file)
    return render_template('index.html', data1=data1, data2=data2)


@app.route('/books')
def books():
    with open('static/json/books.json') as f:
        data = json.load(f)
    return render_template('books.html', books=data)

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/login', methods =['GET', 'POST'])
def login():
    mesage = ''
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        email = request.form['email']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE email = % s AND password = % s', (email, password, ))
        users = cursor.fetchone()
        if users:
            session['loggedin'] = True
            session['user_id'] = users['user_id']
            session['name'] = users['name']
            session['email'] = users['email']
            mesage = 'Logged in successfully !'
            return render_template('index.html', mesage = mesage)
        else:
            mesage = 'Please enter correct email / password !'
    return render_template('login.html', mesage = mesage)

@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('user_id', None)
    session.pop('email', None)
    return redirect(url_for('login'))

@app.route('/register', methods =['GET', 'POST'])
def register():
    mesage = ''
    if request.method == 'POST' and 'name' in request.form and 'password' in request.form and 'email' in request.form :
        userName = request.form['name']
        password = request.form['password']
        email = request.form['email']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE email = % s', (email, ))
        account = cursor.fetchone()
        if account:
            mesage = 'Account already exists !'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            mesage = 'Invalid email address !'
        elif not userName or not password or not email:
            mesage = 'Please fill out the form !'
        else:
            cursor.execute('INSERT INTO users VALUES (NULL, % s, % s, % s)', (userName, email, password, ))
            mysql.connection.commit()
            mesage = 'You have successfully registered !'
            return render_template('login.html')
    elif request.method == 'POST':
        mesage = 'Please fill out the form !'
    return render_template('register.html', mesage = mesage)
    


if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)
    # books = Book.get_all_books()
    # for book in books:
    #     print(f"IMAGE: {book['image']}\nABOUT: {book['about']}\n\n")
