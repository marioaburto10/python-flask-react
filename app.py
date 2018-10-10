# import necessary libraries
from flask import Flask, render_template, request, jsonify, Blueprint
import ast
import requests
import json
from wit import Wit
from config import wit_access_token


# create instance of Flask app
app = Flask(__name__, template_folder="client/build", static_folder="client/build/static")

# create route that renders index.html template
@app.route("/")
def index():

  return render_template("index.html")

# create route that sends text to Wit.AI
@app.route("/api/text", methods=["POST"])
def sendTextToWit():

	# API_ENDPOINT = "https://api.wit.ai/message"

	data = request.data.decode("utf-8") 
	data_dict = ast.literal_eval(data)
	text = data_dict["text"]

	client = Wit(access_token=wit_access_token)
	respContent = client.message(text)
	respText = respContent["_text"]

	print("CONTENT FROM WIT.AI: ", respText)

	return jsonify(respText)

if __name__ == "__main__":
    app.run(debug=True)