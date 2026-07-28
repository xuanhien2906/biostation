@echo off
cd /d "%~dp0"
git add .
git commit -m "Admin Update Web"
git push
echo XONG! Ban cho 1-2 phut la web se cap nhat.
pause
