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
          var users = data.data.data
          console.log(users);
          var selected = [];

          var usersData = [];
          for (var i = 0; i < users.length; i++) {
            usersData.push([i+1, users[i].firstName, users[i].lastName, users[i].email, users[i].service]);
          }
           $('#table').DataTable({
            data: usersData,
            deferRender: true,
            scrollY: 200,
            scrollCollapse: true,
            scroller: true
          });  
          $('#table tbody').on('click', 'tr', function () {
            var id =$('#table').DataTable().row( this ).index();
                     
              $('#fullName').html('<i><h4>' + users[id].firstName + ' ' + users[id].lastName + '</h4></i>');
              $('#name').html('<p> Full Name : ' + users[id].firstName + ' ' + users[id].lastName + '<p>');
              $('#email').html('<p> Email : ' + users[id].email + '</p>');
              $('#createdDate').html('<p> Created Date : ' +users[id].createdDate + '</p>');
              $('#phoneNumber').html('<p> PhoneNumber : ' + users[id].phoneNumber + '</p>');
              $('#role').html('<p> Role : ' + users[id].role + '</p>');
              $('#service').html('<p> Service : ' + users[id].service + '</p>');
              $('#userName').html('<p> Username : ' + users[id].username + '</p>');              
                           
            $("#trigger").click();
                     
        });          
        },
        error: function (error) {
          console.log(error);
        }        
      });
      $.ajax({
        type: "GET",
        url: 'http://34.213.106.173/api/user/UserStatics',
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
        success: function (response) {
          console.log("successfull");
          console.log(response);
          var arr = response.data.details;
          var html = '';
          for (let index = 0; index < arr.length; index++) {
            html += "<span class='card col-sm-5 mr-auto text-center bg-white ' >";
            html += "<div class='card-header ' style = 'background-image: linear-gradient(to bottom right, #66d9ff, #3399ff); color:#ffffff'>" + arr[index].service + "</div>";
            html += "<div class='card-body text-dark'>" + arr[index].count + "</div>";
            html += "</span>";
            $("#services").html(html);
          }
        },
        error: function (response) {
          console.log('Error in login');
        }
      })
      $("#logout").click(function () {
        $.ajax({
          url: 'http://34.213.106.173/api/user/logout',
          type: "POST",
          headers: {
            'Authorization': localStorage.getItem('token'),
          },
          success: function (res) {
            console.log(res);
            localStorage.clear();
            $(location).attr('href',"admin/login");
            // window.location.replace("admin/login");
          },
          error: function (error) {
            console.log(error);
            $("h6").text("Unauthorized").show().fadeOut(5000);
          }
        });
      }); 
      
      $("#approval").click(function () {
        $(location).attr('href',"admin/approval");
      });
    });
  }
}


