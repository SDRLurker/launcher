  var spawnCommand = require('spawn-command');
  function execute(cmd, param)
  {  
    var full_cmd = "\"" + cmd + "\"";
    if(param && param.length > 0){
      full_cmd = "\"" + cmd + "\"" + " " + param;
    }
    var process = spawnCommand(full_cmd, { detached: true });
    process.stdout.on('data', function(data) {   
    });
    process.stderr.on('data', function(data) {   
    });
  }

  var path = require('path');
  function getConfDirectory(){
    var confDir = process.env.APPDATA + '\\launcher.js'
    var stats;
    //console.log(confDir);
    try{
      stats = fs.lstatSync(confDir);
    }catch(e){
      fs.mkdirSync(confDir);
    }
    return confDir;
  }

  var fs = require('fs');
  function readSingleFile(filename, fn) {
    fs.readFile(filename, function(err, data){
      var stat = fs.lstatSync(filename);
      if(stat.size > 1024*1024)
      {
        alert('JSON 설정파일이 1MB를 초과하였습니다. 파일을 불러올 수 없습니다.');
        return;
      }

      fn(data);
    });
  }
  function writeSingleFile(filename, data) {
    fs.writeFile(filename, data, function(err){
      if(err){
        alert('파일 저장에 실패하였습니다.');
      }      
    });
  }
  
  function addid(tab_obj, id, static_element) {
    tab_obj[id] = {"static" : static_element};
  }
  var tab = {};
  var tabFile = getConfDirectory() + '\\' +'tab.json';
  
  function writeConfJSON(data){
    fs.writeFile(tabFile, JSON.stringify(data, null, 4), function(err){
      if(err){
        alert('JSON 설정파일 저장 실패!!');
      } else {
        //alert('JSON 설정파일 저장 : ' + tabFile);
      }
    });
  }
  
  function readConfJSON(){
    if(fs.existsSync(tabFile)){
      var data = fs.readFileSync(tabFile, 'utf8');
      tab = JSON.parse(data);
    } else {
      writeConfJSON({});
    }
  }


  function importConfJSON(confpath){
    var numtab = null;
    if(fs.existsSync(confpath)){
      var data = fs.readFileSync(confpath, 'utf8');
      try{
        newtab = JSON.parse(data);
      } catch(e) {
        alert('설정파일을 읽는데 실패하였습니다.');
        return false;
      }
    } else {
      alert('해당 설정파일이 없습니다.');
    }

    for(var key in newtab){
      if(newtab.hasOwnProperty(key)){
        var obj = newtab[key];
        for(var static in obj){          
          if(obj.hasOwnProperty(static)){
            
            if(typeof obj.static.exepath !== 'string')
              return false;
            if(typeof obj.static.param !== 'string')
              obj["static"]["param"] = '';
            if(typeof obj.static.confpath !== 'string')
              obj["static"]["confpath"] = '';
            if(typeof obj.static.source !== 'string')
              obj["static"]["source"] = '';

            tab[key] = obj;
          }
        }
      }
    }
    return true;
  }