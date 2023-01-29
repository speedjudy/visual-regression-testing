$(function(){
 
          var sep = $(".cWwxxx")[1].innerText.split(" ");
          

          $(".cWwxxx")[1].innerText = sep[0] + " Unchanged";
var sep1 = $(".cWwxxx")[0].innerText.split(" ");
          

          $(".cWwxxx")[0].innerText = sep1[0] + " Changed";
 $(".sc-bxivhb h1").text(" Report Result"); 
          if ($(".sc-bZQynM").children().length==1) {
            $(".sc-bZQynM").append('<div><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="phone_svg" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16"> <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/> <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/> </svg></div>');
            $(".sc-bZQynM").append('<div><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="tablet_svg" fill="currentColor" class="bi bi-tablet-landscape" viewBox="0 0 16 16"> <path d="M1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm-1 8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8z"/> <path d="M14 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"/> </svg>');
            $(".sc-bZQynM").append('<div><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="desktop_svg" viewBox="0 0 24 24"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>');
          }
          var responsive_flag = 'all';
          let test_section = $(".sc-gPEVay").children();
          for (var i=0;i<test_section.length; i++) {
            var test = test_section[i];
            var type_text = $(test).find(".sc-hMqMXs")[2];
            $(type_text).hide()
            console.log(type_text)
          }
          $('.sc-bZQynM div svg').click(function(){
            $('.'+responsive_flag).attr('width', 25);
            $('.'+responsive_flag).attr('height', 25);
    
            responsive_flag = $(this).attr('class');
    
            $('.'+responsive_flag).attr('width', 34);
            $('.'+responsive_flag).attr('height', 34);
    
            
            for (var i=0;i<test_section.length; i++) {
              var test = test_section[i];
              var type_text = $(test).find(".sc-kEYyzF");
              var t_t = type_text[2].innerText.split("_");
              var device_type = t_t[t_t.length-1].split('.')[0] + '_svg';
              if (responsive_flag == 'all') {
                $(test).show();
              } else if (responsive_flag == device_type) {
                $(test).show();
              } else {
                $(test).hide();
              }
              console.log(device_type)
            }
          });
         
});