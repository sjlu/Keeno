<?php
include('db.php');

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die("Error connect to database");
mysql_select_db($dbname, $conn);

if($_REQUEST['fbid']){
	$fbid = mysql_real_escape_string($_REQUEST['fbid']);
	$lat = mysql_real_escape_string($_REQUEST['lat']);
	$long = mysql_real_escape_string($_REQUEST['long']);
	
	$query = "UPDATE Users set latitude=$lat, longitude=$long WHERE fbid=$fbid";
	mysql_query($query);
	print mysql_error($conn);
	$lat_upper = $lat + 0.01;
	$lat_lower= $lat - 0.01;

	$long_upper = $long + 0.01;
	$long_lower= $long - 0.01;


	$query = "SELECT fbid,latitude,longitude,sq_photo,gender,firstName FROM Users WHERE latitude<=$lat_upper AND latitude>=$lat_lower AND longitude<=$long_upper AND longitude>=$long_lower";
	$result = mysql_query($query);
	$fbids_near = array();

	while( $row = mysql_fetch_array($result)){
		$interest_query = "SELECT * FROM (SELECT LCASE(interest_name) FROM Interests NATURAL JOIN Users WHERE fbid=".$row['fbid'].") x NATURAL JOIN (SELECT LCASE(interest_name) FROM Interests NATURAL JOIN Users WHERE fbid=$fbid) y";
		$interests_results = mysql_query($interest_query);
		$common_interests = array();

		while($interest_row = mysql_fetch_array($interests_results)){
			$common_interests[] = $interest_row[0];	
		}
		if ( sizeof($common_interests) != 0 && $row['fbid'] != $fbid){
			$fbids_near[$row["fbid"]] = array("fbid" => $row['fbid'], "latitude" => $row['latitude'], "longitude" => $row['longitude'], "sq_photo" => $row['sq_photo'], "gender" => $row['gender'], "firstName" => $row['firstName'], "Interests_In_Common" => $common_interests);
		}

	}

	print mysql_error($conn);


	$query = "SELECT fbid_from,UNIX_TIMESTAMP(msg_time) as time ,message,firstName,sq_photo FROM Messages join Users on fbid=fbid_from where fbid_to=$fbid";
	$result = mysql_query($query);
	$messages = array();
	while( $row = mysql_fetch_array($result)){
		$messages[] = array("fbid_from" => $row['fbid_from'], "msg_time" => $row['time'], "message" => $row['message'], "sq_photo" => $row['sq_photo'], "first_name" => $row['firstName']);
	}
	print mysql_error($conn);

	$toReturn = array("nearby_users" => $fbids_near, "messages" => $messages);
	print json_encode($toReturn);

	$query = "DELETE FROM Messages WHERE fbid_to=$fbid";
	mysql_query($query);
	
 		
}

mysql_close($conn);



?>
