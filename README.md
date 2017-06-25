History Map Project
===================

[![Join the chat at https://gitter.im/necipsunmaz(https://gitter.im/necipsunmaz.svg)](https://gitter.im/necipsunmaz)


This project has been developed to be completely dynamic as you can instantly review the world history on a single map.

Used technologies:

- ASP.NET CORE MVC6 Framework
- Entity Framework Core 1.1.2
- CKEditor 4.7


Examples and demonstration: 
<http://www.necipsunmaz.net>

![alt text](http://i.imgur.com/DXwXpdD.jpg)

![alt text](http://i.imgur.com/DCBExSN.jpg)

[![Watch the demo video]](https://youtu.be/Md7LJ4JmQQ4)


## How to install?
- Open the project with Visual Studio. (Recommended version 2017)
- Create "appsettings.json" file in the HistoryMap project folder.
- Paste this code into the appsettings.json file and edit it. (Use MSSQL)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "data source=/Your data source/;initial catalog=/Your Database/;persist security info=True;user id=/Your user id/;password=/Your Password/;MultipleActiveResultSets=True;App=EntityFramework"
  },

  "Logging": {
    "IncludeScopes": false,
    "LogLevel": {
      "Default": "Warning"
    }
  }
}
```
- Open Package Manager Console, write "Update-Database" and enter.
- Create you new user and upload your new mapfile. (Example SVG World Map: https://goo.gl/BGNi1i )
- Done..


### Contributors (You can add your name here in your pull-request)

- Necip Sunmaz <sunmaznecip@gmail.com>
