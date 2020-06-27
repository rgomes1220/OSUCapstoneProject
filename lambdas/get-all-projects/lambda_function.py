from utils import awsHelper as awsUtils
from decimal import Decimal
import json

# used when json.dumps cannot by default decode an element
def default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)

def handler(event, context):

    ddb = awsUtils.connect_ddb()
    project_table=ddb.Table('osu-expo-projects')
    table_data = project_table.scan()
    ret = {
        "statusCode" : "200" ,
        "headers" : {
            "Content-Type" : "application/json" ,
            "Access-Control-Allow-Headers" : 'Content-Type' ,
            "Access-Control-Allow-Origin" : "*" ,
            "Access-Control-Allow-Methods" : "POST, OPTIONS" ,
            "Access-Control-Allow-Credentials" : True
        },
        "body": json.dumps(table_data["Items"], default=default)}
    return ret
