@echo off
setlocal
cd /d "%~dp0"
echo.
echo   hush. - local server
echo   http://127.0.0.1:8787/
echo   Press Ctrl+C to stop.
echo.
start "" cmd /c "timeout /t 2 >nul & start http://127.0.0.1:8787/"
python -m http.server 8787 --bind 127.0.0.1
