Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = oWS.SpecialFolders("Desktop") & "\Zenfix Demo.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "C:\Users\ALIENWARE\.openclaw\workspace\projects\zenfix\ZenfixDemo.bat"
oLink.WorkingDirectory = "C:\Users\ALIENWARE\.openclaw\workspace\projects\zenfix"
oLink.Description = "Zenfix Demo - AI Fortune Telling"
oLink.IconLocation = "C:\Users\ALIENWARE\.openclaw\workspace\projects\zenfix\assets\zenfix-icon-final.ico"
oLink.Save

WScript.Echo "Desktop icon updated successfully!"
WScript.Echo "Please refresh your desktop (press F5) to see the new icon."