  var is_code_verified = false;

  function verify_code(confpath)
  {
    var test_verify = $("#test").is(':visible');
    if(confpath && confpath.length > 0 && test_verify === false)
      alert('먼저 코드작성이 검증이 되어야 합니다.');
    else 
      test_verify = true;
    return test_verify;
  }

  $("#test").fadeOut();
  window.onerror = function(){
    is_code_verified = false;
    $("#test").fadeOut();
    alert('검증에 실패하였습니다.');
  };

  $("#verify").on("click", function(){
    var confpath = null;
    var source = $("#source").val(); 
    is_code_verified = true;

    if(typeof key !== 'undefined' && key && key.length > 0 && typeof tab[key] === 'object'){
      confpath = tab[key]["static"]["confpath"];      
    } else {
      confpath = $("#confpath").val();
    }

    if(confpath && confpath.length > 0){
      readSingleFile(confpath, function(data){
        $("#file_content").val(data.toString());
      });
    }

    run(source);
    if(typeof replace === 'function')
      replace(source);
    if(is_code_verified  === true)
      $("#test").fadeIn();
  });
  
  // 테스트
  $("#test").on("click", function(){
    var conf_content = $("#file_content").val();
    var result = replace(conf_content);  
    $("#file_content").val(result);
  });