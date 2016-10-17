<?php

Class Admin{
    public function process(){
        $action = isset($_REQUEST['action'])?htmlentities($_REQUEST['action']):'';

        switch ($action){
            case 'registration':
                $obj = new Registration;
                $obj->doRegistration();
                break;
            case 'registration2':
                $obj = new Registration;
                $obj->doRegistration2();
                break;
        }
    }
}

class Registration{
    public function doRegistration(){
        $username = isset($_POST['username'])?htmlentities($_POST['username']):'';
        $email = isset($_POST['email'])?htmlentities($_POST['email']):'';
        $first_name = isset($_POST['first_name'])?htmlentities($_POST['first_name']):'';
        $password = isset($_POST['password'])?htmlentities($_POST['password']):'';
        $terms = isset($_POST['password'])?htmlentities($_POST['terms']):'0';

        // do some php validation!
        $validation = true;
        // connect with DB and make record if validation is successful
        $result_db = true;
        //if record in DB is done return json string

        if($validation && $result_db){
            $regist_arr = array(
                'username' => $username,
                'status'   => 1,
            );
        }
        else{
            $regist_arr = array(
                'username' => '',
                'status'   => 0,
            );
        }

        $json_str = json_encode($regist_arr);
        echo $json_str;
    }
    public function doRegistration2(){
        $username = isset($_POST['username'])?htmlentities($_POST['username']):'';
        $address1 = isset($_POST['address1'])?htmlentities($_POST['address1']):'';
        $address2 = isset($_POST['address2'])?htmlentities($_POST['address2']):'';
        $postal_code = isset($_POST['postal_code'])?htmlentities($_POST['postal_code']):'';
        $phone_number = isset($_POST['phone_number'])?htmlentities($_POST['phone_number']):'';
        $bonus_code = isset($_POST['bonus_code'])?htmlentities($_POST['bonus_code']):'';


        // do some php validation!
        $validation = true;
        // connect with DB and make record if validation is successful
        $result_db = true;
        //if record in DB is done return json string

        if($validation && $result_db){
            $regist_arr = array(
                'username' => $username,
                'status'   => 2,
            );
        }
        else{
            $regist_arr = array(
                'username' => '',
                'status'   => 0,
            );
        }

        $json_str = json_encode($regist_arr);
        echo $json_str;
    }
}

$obj = new Admin;
$obj->process();

?>