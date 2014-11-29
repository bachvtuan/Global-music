#This bash help auto restart nodejs instance it is's crashed, the log will be stored at log/out.log
log_file=logs/log_`date +%Y%m%d-%H%M`
forever  -o $log_file  start --spinSleepTime 10000 run.js config_production.json >> logs/forever.txt 2>&1
cat logs/forever.txt
rm logs/forever.txt