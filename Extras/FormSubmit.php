<html>
<body>

<style>
h1, h3, p {
	text-align: center;
}
</style>

<h1>Thank you for submitting</h1><br>
<h3>your concern.</h3><br><br>
<h3>First Name: </h3>
<p><?php echo $_POST["fname"]; ?></p><br>
<h3>Last Name: </h3>
<p><?php echo $_POST["lname"]; ?></p><br>
<h3>Country: </h3>
<p><?php echo $_POST["country"]; ?></p><br>
<h3>Email: </h3>
<p><?php echo $_POST["email"]; ?></p><br>
<h3>Message: </h3>
<p><?php echo $_POST["message"]; ?></p><br>

</body>
</html>