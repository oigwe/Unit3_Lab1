const math = {};



const getParams = function (url) {
    let params = {};
    let interroNum = url.indexOf('?');
    const interro =   url.slice(interroNum+1);
	const vars = interro.split('&');
	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
    return params;
};

math.add = (url) => {
    let jsonObj = {
        input: {},
        sumString: '',
        sum: 0,
    };

    jsonObj['input'] = getParams(url);
    jsonObj['sum'] = 0;
    jsonObj['sumString']='';
    for(values in jsonObj['input']){
        if( !Number(jsonObj['input'][values])) {
            return {error: `You passed a non-number value into the parameters`};
        }
        jsonObj['sum']+= Number(jsonObj['input'][values]);
        jsonObj['sumString'] = Object.values(jsonObj['input']).join('+');           
    }
    return `${JSON.stringify(jsonObj)}`;
}



module.exports = math;