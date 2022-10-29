const fs = require('fs');

const convertWithInstructions = (obj, instructions, objectToReturn) => {
    for (const key in instructions) {
        const value = instructions[key];
        if (!value) {
            continue;
        }
        if (typeof value !== "object") {
            if (obj[key] !== undefined) {
                objectToReturn = {
                    ...objectToReturn,
                    [key]: obj[key]
                }
            }
        } else {
            if (typeof obj[key] === "object" &&
                !Array.isArray(obj[key]) &&
                obj[key] !== null) {
                objectToReturn = {
                    ...objectToReturn,
                    [key]: convertWithInstructions(obj[key], value, {})
                }
            }
        }
    }
    return objectToReturn;
}

const convertJsons = (inputJsons, instructions) => {
    const convertedArrayOfJsons = inputJsons.map((inputObject, index) => {
        const returnedObject = convertWithInstructions(inputObject, instructions, {});
        if (returnedObject) {
            console.log(`The inputObject at index ${index} converted successfully!`);
        } else if (!returnedObject) {
            console.error(`The inputObject at index ${index} failed converting.`);
        }

        return returnedObject;
    });
    console.log('Done converting!')
    fs.writeFile("./jsons/output.json", JSON.stringify(convertedArrayOfJsons), function () { console.log('Done printing conversion!') });
}



fs.writeFile("./jsons/output.json", "", function () {
    console.log('Cleaned output file.')
    const inputJsonsRaw = fs.readFileSync("./jsons/input.json", { encoding: 'utf8' });
    const instructionsRaw = fs.readFileSync("./jsons/instructions.json", { encoding: 'utf8' });
    if (!inputJsonsRaw) {
        fs.writeFile("./jsons/output.json", JSON.stringify({ "error": "The input.json file is empty." }), function () { console.log('Printed an error in the output.json file.') });
        return;
    } else if (!instructionsRaw) {
        fs.writeFile("./jsons/output.json", JSON.stringify({ "error": "The instructions.json file is empty." }), function () { console.log('Printed an error in the output.json file.') });
        return;
    }
    const inputJsons = JSON.parse(inputJsonsRaw);
    const instructions = JSON.parse(instructionsRaw);

    if (!Array.isArray(inputJsons)) {
        fs.writeFile("./jsons/output.json", JSON.stringify({ "error": "The input.json file doesn't contain an array at it's root." }), function () { console.log('Printed an error in the output.json file.') });
        return;
    } else if (inputJsons.length < 1) {
        fs.writeFile("./jsons/output.json", JSON.stringify({ "error": "The array in the input.json file is empty." }), function () { console.log('Printed an error in the output.json file.') });
        return;
    } else if (
        typeof instructions !== "object" ||
        (typeof instructions === "object" &&
            (Array.isArray(instructions) ||
                instructions === null))
    ) {
        fs.writeFile("./jsons/output.json", JSON.stringify({ "error": "The instructions.json file doesn't contain an object at it's root." }), function () { console.log('Printed an error in the output.json file.') });
        return;
    } else if (Object.entries(instructions).length < 1) {
        fs.writeFile("./jsons/output.json", JSON.stringify({ "error": "The json in the instructions.json file is empty." }), function () { console.log('Printed an error in the output.json file.') });
        return;
    }
    console.log(`instructions`, instructions);
    convertJsons(inputJsons, instructions);
});