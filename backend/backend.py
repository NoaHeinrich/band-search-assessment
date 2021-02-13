from flask import Flask, jsonify
import jellyfish
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# set up a simple Flask server to recieve a GET request to the search route

bands = set(line.strip() for line in open('fake_band_names_mit.txt'))
# I begin by reading each line from the txt file and saving them into a set
# for greatest search efficiency


@app.route('/api/query/<query>')
def search(query):
    # use list comprehension to simply find band namess that contain the query
    filtered = [x for x in bands if query.lower() in x.lower()] 
    # use the jellyfish library's levenshtein distance algorithm to determine similarity between bands and search query
    sorted_bands = sorted(filtered, key=lambda name: jellyfish.levenshtein_distance(query, name))
    # use list comprehension to convert sorted bands to a list of dictionaries with rank, and then convert to json using jsonify
    return jsonify([{'bandName': name, 'rank': index+1 } for index, name in enumerate(sorted_bands)])
