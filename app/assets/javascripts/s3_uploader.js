jQuery(function() {

  var host = 'http://www.bhavishh.com';

  var params = decodeURIComponent(location.href).split('?')[1].split('&');
  var s3BucketUrl;
  var jqXHR = new Array();

  for (x in params){
    var key = params[x].split('=')[0];
    var val = params[x].substring(params[x].search('=')+1);
    if( key == 'bucket' )
      s3BucketUrl = val;
    else
      $('#file_upload input[name=' + key.replace(/^_/,'') + ']').val(val);
   }

  // Opera doesn't handle multiple files properly so use single file selection there
  if (navigator.appName == 'Opera') {
    $('#file_upload').find('input:file').each(function () {
      $(this).removeAttr('multiple')
        // Fix for Opera, which ignores just removing the multiple attribute:
        .replaceWith($(this).clone(true));
    });
  }

  function randomString(length) {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyz';
    var sRnd = '';
    for (var i=0; i<length; i++){
        var randomPoz = Math.floor(Math.random() * chars.length);
        sRnd += chars.substring(randomPoz,randomPoz+1);
    }
    return sRnd;
  }

  $(window).on("message", function (e) {
    e.preventDefault();
    if (e.originalEvent.origin !== host)
      return;
    var data = JSON.parse(e.originalEvent.data)
    jqXHR[data.uuid].abort();
  });

  $('#file_upload').fileupload({

    url: s3BucketUrl,

    formData: function (form) {
      var data = form.serializeArray();
      var fileType = '';
      if ('type' in this.files[0] )
        fileType = this.files[0].type;
      data.push({ name: 'Content-Type', value: fileType })
      data[0].value = data[0].value.replace(':uuid', this.context);
      return data;
    },

    add: function (e, data) {
      var postData = { eventType: 'add upload' }
      postData.uuidInKey = $('#file_upload input[name=key]').val().search(':uuid') != -1;
      postData.file_name = data.files[0].name;
      postData.uuid = randomString(20);

      window.parent.postMessage(JSON.stringify(postData), host);

      data.context = postData.uuid;
      jqXHR[postData.uuid] = data.submit();
    },

    progress: function (e, data) {
      window.parent.postMessage( JSON.stringify({ eventType: 'upload progress',
                                 uuid: data.context,
                                 progress: parseInt(data.loaded / data.total * 100, 10) }),
                                 host);
    },

    done: function (e, data) {
      var file = data.files[0];
      var postData = { eventType: 'upload done', uuid: data.context };
      postData.file_name = file.name;
      postData.s3_key = $('#file_upload input[name=key]').val().replace('/${filename}', '').replace(':uuid', data.context);
      if( 'size' in file ) postData.file_size = file.size;
      if( 'type' in file ) postData.file_type = file.type;
      window.parent.postMessage(JSON.stringify(postData), host);
    }
  });
});