# Database Structure - DynamoDB
The data for our project is stored in dyanamoDB, a NoSQL database optimized for fast read/writes. In DyanamoDB, we have 2 tables which represent the 2 main "entities" of our project with the following structure:

**Projects**
* project_id - String
    * Primary Key for a project.
* name - String
    * name of the project
* description - String
    * description of the project
* picture - String
    * Image to be associated with the project. This is the name of the file that is stored in S3 so it can be retrieved when data about this project is retrieved
* team - List<Map>
    * List of users that are associated with the project, i.e. its authors. The Maps in the list have the following structure
        * Map: {"email":String}
* school - String
    * School associated with the project.
* tech - String
    * Primary technology used in the project.
* college - String
    * College associated with the project.
* links - List<Map>
    * Any reference links associated with the project. The maps have the following structure:
        * Map: {"link":String, "name":String}


**Users**
* user_id - String
    * Primary Key for a user.
* display_name - String
    * User's display name, typically first and last name.
* description - String
    * A description/bio of the user.
* email - String
    * Email address of the user. This can also be used as a primary key.
* links - List<Map>
    * Any links the user wants to associate with themselves. The maps have the following structure:
        * Map: {"link":String, "name":String}



# REST API actions

Each API action corresponds to a lambda function that will be called via an Api Gateway endpoint in our application. The "Resources" that are interacted with in our API are the entities described above.

## Create New Project
* **POST** request

**Required Body Parameters**
```
{
  "name": String,
  "description": String,
  "picture": String,
  "team": List<Map>,
  "school": String,
  "tech": String,
  "college": String,
  "links": List<Map>
}

```



## Get All Projects
* **GET** request

**No Required Parameters**

## Get Project
* **GET** request

**Required Query String Parameters**
* project_id


## Create New User
* **POST** request

**Required Body Parameters**
```
{
  "email": String
}

```

**No other parameters are required to create a user, but these will be accepted**
```
{
  "display_name":String,
  "description":String,
  "links":List<Map>
}

```

## Get All Users
* **GET** request

**No Required Parameters**

## Get User
* **GET** request

**Required Query String Parameters**
* user_id
