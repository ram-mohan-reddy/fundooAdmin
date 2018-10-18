import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import 'datatables.net';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor() { }  
  ngOnInit() {
    $(document).ready(function () {      
      $.ajax({  
        url: 'http://34.213.106.173/api/user/getAdminUserList',  
        type: 'GET',  
        dataType: 'json',  
        success: function (data) {  
        var users= data.data.data           
    var usersData = [];
    for (var i = 0; i < users.length; i++) {
      usersData.push([i, users[i].firstName, users[i].lastName, users[i].email, users[i].service]);
    }
    $('#example').DataTable({
      data: usersData,
      deferRender: true,
      scrollY: 200,
      scrollCollapse: true,
      scroller: true
    });
        },  
        error: function (error) {  
            console.log(error);  
        }  
    }); 
    $( "#logout" ).click(function() {
      localStorage.clear();
      window.location.replace("admin/login");
    });
    });
    $(document).ready(function () {
      
    $.ajax({
      type: "GET",
      url:'http://34.213.106.173/api/user/UserStatics',
    headers:{
        'Authorization':localStorage.getItem('token'),
      },
      success:function(response){
        console.log("successfull");
        console.log(response);
        var arr=response.data.details;
        var html='';
        for(let index=0;index<arr.length;index++)
        {
          html+="<span class='card col-sm-5 mr-auto text-center bg-white' >";
          html+="<div class='card-header ' style = 'background-image: linear-gradient(to bottom right, #66d9ff, #3399ff); color:#ffffff'>"+arr[index].service+"</div>";
          html+="<div class='card-body text-dark'>"+arr[index].count+"</div>";
          html+="</span>";
          $("#services").html(html);
        }
      },
      error:function(response){
        console.log('Error in login');       
      }      
    })
   })
  }  
}
