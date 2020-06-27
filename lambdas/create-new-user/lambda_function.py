from utils import awsHelper as awsUtils
from datetime import datetime
from decimal import Decimal
import json

# used when json.dumps cannot by default decode an element
def default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)

class NULL_NAMESPACE:
    bytes = b''

def handler(event, context):

    required_args_present=False
    try:
        required_args_present = set(['email','user_id']).issubset(set(list(json.loads(event["body"]).keys())))
    except Exception as e:
        return {
        "statusCode" : "400" ,
        "headers" : {
            "Content-Type" : "application/json" ,
            "Access-Control-Allow-Headers" : 'Content-Type' ,
            "Access-Control-Allow-Origin" : "*" ,
            "Access-Control-Allow-Methods" : "POST, OPTIONS" ,
            "Access-Control-Allow-Credentials" : True
        },
        "body": json.dumps({"ERROR":"Error getting body of request, it may not have been passed correctly",
                            "Exception":str(e)})
        }

    if (not required_args_present):
        return {
        "statusCode" : "400" ,
        "headers" : {
            "Content-Type" : "application/json" ,
            "Access-Control-Allow-Headers" : 'Content-Type' ,
            "Access-Control-Allow-Origin" : "*" ,
            "Access-Control-Allow-Methods" : "POST, OPTIONS" ,
            "Access-Control-Allow-Credentials" : True
        },
        "body": json.dumps({"ERROR":"The required argument [EMAIL] is not present"})
        }


    # all the args are present so can put in ddb
    input_data = json.loads(event["body"])
    item={}
    # using .get and returning None if it doesn't exist since email is the only required arg to create a user
    item['email'] = input_data.get("email", None)
    item['display_name'] = input_data.get("display_name", None)
    item['description'] = input_data.get("description", None)
    item['links'] = input_data.get("links", None)

    # userid based on email and timestamp
    item['user_id'] = input_data.get("user_id", None)

    ddb = awsUtils.connect_ddb()
    response=ddb.Table('osu-expo-users').put_item(Item=item)


    ret = {
        "statusCode" : "200" ,
        "headers" : {
            "Content-Type" : "application/json" ,
            "Access-Control-Allow-Headers" : 'Content-Type' ,
            "Access-Control-Allow-Origin" : "*" ,
            "Access-Control-Allow-Methods" : "POST, OPTIONS" ,
            "Access-Control-Allow-Credentials" : True
        },
        "body": json.dumps( response,default=default)}

    return ret
