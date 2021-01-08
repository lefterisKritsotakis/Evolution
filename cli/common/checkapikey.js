module.exports = (api_key) => {
	if (api_key.length != 14){
		console.log({error: "This API KEY is not valid -length-!"})
		process.exit()
	}
	if (!api_key.substring(0,4).match(/^[0-9a-z]+$/)){
		console.log({error: "This API KEY is not valid! -not alphanumeric 1-"})
		process.exit()
	}
	else if (!api_key.substring(5,9).match(/^[0-9a-z]+$/)){
		console.log({error: "This API KEY is not valid! -not alphanumeric 2-"})
		process.exit()
	}
	else if (!api_key.substring(10,14).match(/^[0-9a-z]+$/)){
		console.log({error: "This API KEY is not valid! -not alphanumeric 3-"})
		process.exit()
	}
	else if (api_key.substring(4,5) != '-' || api_key.substring(9,10) != '-'){
		console.log({error: "This API KEY is not valid -missing paules-!"})
		process.exit()
	}
	else{
		console.log({message: "This API KEY is valid!"})
	}
}
