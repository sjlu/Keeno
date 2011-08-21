<?php
include('db.php');

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die("Error connect to database");
mysql_select_db($dbname, $conn);

if($_REQUEST){
	$fbid_from = mysql_real_escape_string($_REQUEST['fbid_from']);
	$fbid_to = mysql_real_escape_string($_REQUEST['fbid_to']);
	$msg = mysql_real_escape_string($_REQUEST['message']);

	$query = "INSERT INTO Messages VALUES ($fbid_from, $fbid_to, null, \"$msg\")";
	mysql_query($query);

	//find if the recpeient has a device token
	$query = "SELECT device_id FROM Users where fbid=$fbid_to AND device_id IS NOT null";
	$result = mysql_query($query);
	while( $row = mysql_fetch_array($result)){
			$token = $row['device_id'];
			$query = "SELECT firstName from Users where fbid=$fbid_from";
			$result = mysql_query($query);
			if($row = mysql_fetch_array($result)){
				$name = $row['firstName'];
				$post_string = "{\"aps\": {\"badge\": 1, \"alert\": \"$name: $msg\", \"fbid\":\"$fbid_from\", \"name\":\"$name\"}, \"device_tokens\": [\"$token\"]}";
				post("https://go.urbanairship.com/api/push/", $post_string);
			}
	}

}

print '{"time":"' . time() . '", "msg":"' . $msg . '"}';
mysql_close($conn);


function post($url,$data){
	$c = curl_init();
	curl_setopt($c, CURLOPT_URL, $url);
	curl_setopt($c, CURLOPT_POST, true);
	curl_setopt($c, CURLOPT_MUTE, 1);
	curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($c, CURLOPT_POSTFIELDS, $data );
	curl_setopt($c, CURLOPT_USERPWD, "oq-On1TITpacbrrF6duHIg:6agBu8q-RCGfr6RAtCat4g");
	curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($c, CURLOPT_SSL_VERIFYHOST,  2);
	curl_setopt($c, CURLOPT_HTTPHEADER, array("Content-Type: application/json","Content-length: ".strlen($data))); 
	$result = curl_exec($c);
	$response = curl_getinfo($c); 

	if($response['http_code'] != 200) {
		print "POST returned http status code " . $response['http_code'] . "\n";
		print $data . "\n";
	}
	curl_close ($c);

}

?>
