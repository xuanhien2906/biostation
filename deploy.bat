@echo off
echo =======================================
echo     DANG BAT DAU DEPLOY LEN GITHUB
echo =======================================

git add .
git commit -m "Auto deploy from script"
git push

echo =======================================
echo     DA HOAN TAT! DANG CHO DEPLOY
echo =======================================
pause
