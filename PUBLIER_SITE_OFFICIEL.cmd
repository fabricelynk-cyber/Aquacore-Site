@echo off
setlocal
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\publish-official-site.ps1"
if errorlevel 1 (
  echo.
  echo La publication a echoue. Le site officiel precedemment en ligne reste a verifier.
)
echo.
pause
endlocal
