@echo off
title Khoi dong Ung dung BiO Station
echo ===================================================
echo   DANG KHOI DONG UNG DUNG BIO STATION...
echo ===================================================
echo.
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"
echo Dang mo trinh duyet tai http://localhost:3000 ...
timeout /t 3 /nobreak >nul
start http://localhost:3000
echo.
echo Dang chay server (Khong tat cua so nay khi dang dung app)...
npm run dev
pause
