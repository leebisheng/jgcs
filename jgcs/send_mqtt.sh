#!/bin/bash
for lp in $(seq 1 10) 
	do 
		i=`expr $lp % 5`
		nohup mosquitto_pub -t magnetic/json/$i -m '{"second":12,"micro-second":246,"mag-x":-246,"mag-y":-116,"mag-z":116}'  &
		nohup mosquitto_pub -t magnetic/json/$i  -m '{"second":23,"micro-second":145,"mag-x":-246,"mag-y":-116,"mag-z":274}'  &
		nohup mosquitto_pub -t magnetic/json/$i  -m '{"second":13,"micro-second":246,"mag-x":-27,"mag-y":-16,"mag-z":274}'  &
		nohup mosquitto_pub -t magnetic/json/$i  -m '{"second":323,"micro-second":116,"mag-x":-279,"mag-y":-145,"mag-z":274}'  &
		nohup mosquitto_pub -t magnetic/json/$i  -m '{"second":323,"micro-second":116,"mag-x":-29,"mag-y":-11,"mag-z":116}'  &
		nohup mosquitto_pub -t magnetic/json/$i  -m '{"second":120,"micro-second":116,"mag-x":-279,"mag-y":-116,"mag-z":274}'  &
		nohup mosquitto_pub -t magnetic/json/$i  -m '{"second":223,"micro-second":116,"mag-x":-279,"mag-y":-11,"mag-z":274}'  &
	done