module.exports = {
    params: {
        wrong_format: 'INVALID ARGUMENTS COMBINATION',
        wrong_number: (arg) => `NEED AN EXTRA ARGUMENT --${arg}. SEE --HELP (-H)`,
        wrong_extention: (ext) => `FORMAT ERROR. EXPECTED ${ext.toUpperCase} FILE`,
        wrong_path: 'PATH IS NOT EXIST'
    },    
}