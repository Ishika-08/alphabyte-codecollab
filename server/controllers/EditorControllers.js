const fs = require('fs');
const {PythonShell} = require('python-shell');
var compiler = require('compilex');



exports.runPython = async (req, res) => {
    const code = req.body.code;
    const input = req.body.input;
    fs.writeFileSync('test.py', req.body.code);

    if(!input){

    let options = {
    mode: 'text',
    pythonOptions: ['-u'], 
    args: [1, 2, 3]
    };

    PythonShell.run('test.py', options).then(messages=>{
    // console.log('results: %j', messages);
    res.json({result: messages[0]});
    });
}
else{
    const options = {
        mode: 'text',
      };
      
      let pyshell = new PythonShell('test.py', options);
      
      pyshell.send(input);
      
      pyshell.on('message', function (message) {
        console.log(message);
      });
      
      pyshell.end(function (err, code, signal) {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('The exit code was:', code);
          console.log('The exit signal was:', signal);
          console.log('Process finished');
        }
      });
}
}





exports.compileCode = async (req, res) => {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang

    var options = {stats : true}; 
    compiler.init(options);

    try {

        if (lang == "C++") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
                compiler.compileCPP(envData, code, function (data) {
                    console.log(data)
                    if (data.output || data.output==="") {
                        res.send(data);
                    }
                    else {
                        console.log(data)
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; 
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.json(data);
                    }
                    else {
                        console.log(data)
                        res.json({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        console.log(data)
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                var envData = { OS: "windows" };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            var envData = { OS: "windows" };
            if (!input) {
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            } else {
                // Ensure input is formatted correctly before passing it to compilePythonWithInput
                var formattedInput = input.replace(/\r?\n$/, '');
                // Remove trailing newline if present
                compiler.compilePythonWithInput(envData, code, formattedInput, function (data) {
                    console.log(data);
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" });
                    }
                });
            }
        // }
        
    }
}
    catch (e) {
        console.log("error")
    }
}





