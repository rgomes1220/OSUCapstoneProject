**To create a new lambda function:**

1. Define aws resources inside restapi.yaml in the cloudformation directory. See comments in the rest api yaml file for instructions.

2. Create a yaml for the api itself in the cloudformation directory using the others as an example
    * In here is where you will define the http method that the api can be called from
        * ApiMethod --> Properties --> Httpmethod
        * ApiInvoke --> Properties --> SourceARN

3. Add the name of the directory to the LAMBDA_DIRS variable defined at the top of build_helper.sh separated by a space. This will make sure your lambda code is built appropriately.

4. Create directory for lambda function inside lambdas directory. Make sure the name of the directory matches the code parameter used in the lambda function cloudformation definition.

5. Create python file named lambda_function.py within the directory. Change the response body as needed, but keep the headers the same unless you intend to change the response content type.

6. Create a requirements.txt file within the directory if the lambda function requires external modules. The format for the requirements.txt file is the same as for any other python project.

7. Create a lambda_test.py function if you intend to create tests.
