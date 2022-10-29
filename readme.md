# convertJsons

convertJsons is a fun\utility project I made that takes an array of objects and an "instructions" object and outputs a less detailed array of objects.

## Simple to set up

The repo is tiny and there is no additional setup, just clone the repo and follow the instructions below.

## Usage

1) Copy your desired array of objects that you want to convert into the "input.json" file.
2) Copy the first object in the above array to the "instructions.json" file.
3) Start removing fields that you don't want in the final array of objects output.
4) Replace the remaining fields values with "true"(boolean not text).
5) You should end up with something like this:
```json
{
    "id": true,
    "first_name": true,
    "last_name": true,
    "primary_address_city": true,
    "phone_work": true,
    "phone_mobile": true,
    "deleted": true,
    "street_c": true,
    "house_number_c": true,
    "entrance_c": true,
    "floor_c": true,
    "appartment_c": true,
    "area_code_c": true,
    "cluster_code_c": true,
    "email": true,
    "create_by": {
        "id": true,
        "username": true,
        "email": true,
        "blocked": true,
        "role": true
    }
}
```
6) Once done setting these up you can run index.js using either of the below:
```bash
nodemon index.js
node index.js
```
nodemon is already set up to re run every time you change something in input\instructions.json, this way speeding up the proccess a lot.

## Tips

-When building the instructions json, you can configure inner objects too, you can see it in the example above at the "create_by" object, if we just wanted to keep the object values as they are then we would have done:
```json
{
    "create_by": true
}
```
You can potentially do it forever as it recurses through the object(potentially).

-You can put "false" as a value for an instruction if you don't want it to show too(works exactly the same as removing it entirely).