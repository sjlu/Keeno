<?php
include('db.php');

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die("Error connect to database");
mysql_select_db($dbname, $conn);

if($_REQUEST){
   $fbid = mysql_real_escape_string($_REQUEST['fbid']);
   $lat = mysql_real_escape_string($_REQUEST['lat']);
   $long = mysql_real_escape_string($_REQUEST['long']);
   $sq_photo = mysql_real_escape_string($_REQUEST['sq_photo']);
   $gender = mysql_real_escape_string($_REQUEST['gender']);
   $name = mysql_real_escape_string($_REQUEST['firstName']);	
   $token = array_key_exists('token',$_REQUEST) ? mysql_real_escape_string($_REQUEST['token']) : ""; 
	
	$hasInterest = false;
	$interests = explode(',',$_REQUEST['interests']);
	//$interests = $_REQUEST['interests'];
	foreach($interests as $interest){
		$interest = mysql_real_escape_string(trim($interest));
		if ($interest != ""){
			$query = "REPLACE INTO Interests VALUES($fbid, \"$interest\")";
			mysql_query($query);
			print mysql_error($conn);
			$hasInterest=true;
		}
	}
	if($hasInterest){
		$query = "REPLACE INTO Users VALUES ($fbid, $lat, $long, \"$sq_photo\", \"$gender\", \"$name\",NULL,";
		if ($token != "") {
			$query = $query . "\"" . $token . "\""; 
		}else{
			$query = $query . "NULL";
		}
		$query = $query . ");";
		mysql_query($query);
		//print $query;
		print mysql_error($conn);

	}else{
		//print "No Interests";
	}
 		
}

mysql_close($conn);



?>
