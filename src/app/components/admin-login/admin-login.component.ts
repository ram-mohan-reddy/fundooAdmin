
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery"

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router: Router) { }

 

  ngOnInit() {

    $(document).ready(function(){
        $("button").click(function(){
            var inputEmail = "";//$("#email").val();
            inputEmail =String( $("#email").val());
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if(!emailReg.test(inputEmail)) {
                $('#email').val('');
                $( "h6" ).text( "Invalid Email Format" ).show().fadeOut( 1000 );;
    
            }

            else if(($( "#email" ).val() == '') && $( "#password" ).val()==''){
                
                $( "h6" ).text( "email and password are required" ).show().fadeOut( 1000 );;
            }
            else if($( "#email" ).val() == ''){
                $('#email').val('');
                $( "h6" ).text( "Enter email" ).show().fadeOut( 1000 );
            }
            else if( $( "#password" ).val()==''){
                $('#password').val('');
          
                $( "h6" ).text( "Enter password" ).show().fadeOut( 1000 );
            }
   
        else {

            const url = "http://34.213.106.173/api/user/adminLogin";
            const data = {
                "email": $( "#email" ).val(),
                "password":$( "#password" ).val()
            }

            console.log(data);
           
               
            $.ajax({
                      url:url,
                      type:"POST",
                      data:data,
                      success:function(res){
                        console.log(res);
                        localStorage.setItem('token',res.id);
                        $(location).attr('href',"admin/home");
                        // window.location.replace("admin/home");  
                      },
                      error:function(error){
                        console.log(error);
                        $( "h6" ).text( "Invalid credentials" ).show().fadeOut( 5000 );
                      }
        
        });    

        $('#email').val('');
        $('#password').val('');
          
            
        }
        return false    
        });
    });   
   }

  
}
