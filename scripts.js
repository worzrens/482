function validateField(field) {
    allowedCharacters = RegExp('^[a-z0-9_]+$');
    return allowedCharacters.test(field)
}


module.exports = {
	
	returnUserObj: function (user) {
	    return (
		{
		    "name": user.name,
		    "password": user.password,
		    "description": user.description
		}
	    );
	},

	filterByName: function (req){
	    return {"name": req.params.userID}
	},

	generateRes: function (res, message, status=200) {
	    return res.status(status).send(message);
	},


	validateCredentials: function (creds, res) {
	    if (creds.name) {
		if (!validateField(creds.name) || !validateField(creds.password)){
		    return generateRes(res, {'message': "Unallowed characters"}, 400)
		}
	    }
	    if (!validateField(creds.password)) {
		return generateRes(res, {'message': "Unallowed characters"}, 400)
	    }
	}

}
