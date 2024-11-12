from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sw.js')
def service_worker():
    return send_from_directory('static/js', 'sw.js')

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
