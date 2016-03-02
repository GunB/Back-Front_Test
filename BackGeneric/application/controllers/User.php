<?php

/*
 * The MIT License
 *
 * Copyright 2016 Heiner.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Description of Api
 *
 * @author Heiner
 */
//debemos colocar esta línea para extender de REST_Controller
require(APPPATH . '/libraries/REST_Controller.php');

class User extends REST_Controller {

    /**
     * Esta sección define los permisos y los limites por llave en el API
     * 
     * users_get: para acceder a users_get debe tener level 1 y no hay limite de consultas por hora
     * user_get:  user_get sólo level 0, pero máximo 10 consultas por hora
     * new_user_post: se necesita level 1, no hay limite de peticiones
     * user_post: se necesita level 1 y el máximo de peticiones es 5 por hora
     *
     */
    protected $methods = [
        'users_get' => array('level' => 0),
        'user_get' => array('level' => 0, 'limit' => 10),
        'new_user_post' => array('level' => 1),
        'user_post' => array('level' => 1, 'limit' => 5)
    ];

    /**
     * Obtiene los datos de un usuario
     * @access public
     * @return object Obtiene un usuario y sus atributos
     * @example http://{host}/{site_name}/User/user/id/{user_id}/format/{formato}/X-API-KEY/{miapikey}
     * Este es el formato que debe usarse para realizar peticiones al API
     * 
     */
    public function user_get() {
        $id = $this->get('id');

        if ($id == NULL) {
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST);
        }

        // Find and return a single record for a particular user.
        $id = (int) $id;

        // Validate the id.
        if ($id <= 0) {
            // Invalid id, set the response and exit.
            $this->response(NULL, REST_Controller::HTTP_BAD_REQUEST); // BAD_REQUEST (400) being the HTTP response code
        }

        // Get the user from the array, using the id as key for retreival.
        // Users from a data store e.g. database
        $this->load->model("user_model");
        $user = $this->user_model->get($this->get("id"));

        if (!empty($user)) {
            $this->set_response($user, REST_Controller::HTTP_OK);
        } else {
            $this->set_response([
                'status' => FALSE,
                'error' => 'User could not be found'
                    ], REST_Controller::HTTP_NOT_ACCEPTABLE);
        }
    }

    /**
     * Crea un nuevo usuario
     * @access public
     * @return string status "failed" o "success" dependiendo de si puede o no 
     * crear el usuario
     * @example http://{host}/{site_name}/User/new_user/format/{formato}/X-API-KEY/{miapikey}
     * y por método de envío "post" username: {new_user} password: {password}
     * Este es el formato que debe usarse para realizar peticiones al API
     * 
     */
    public function new_user_post() {
        if ($this->post("username") && $this->post("password")) {
            $this->load->model("user_model");

            $new_user = $this->user_model->create($this->post("username"), $this->post("password"));
            if ($new_user === false) {
                $this->set_response(array("status" => "failed"), REST_Controller::HTTP_IM_USED);
            } else {
                $this->set_response(array("status" => "success"), REST_Controller::HTTP_OK);
            }
        } else {
            $this->set_response(array("status" => "failed"), REST_Controller::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Actualiza un nuevo usuario
     * @access public
     * @return string status "failed" o "success" dependiendo de si puede o no 
     * actualizar el usuario
     * @example http://{host}/{site_name}/User/user/X-API-KEY/{miapikey}
     * y por método de envío "post" los datos a actulizar.
     * Este es el formato que debe usarse para realizar peticiones al API
     * 
     */
    public function user_post() {
        $this->load->model("user_model");
        $all = $this->input->post(NULL, TRUE);
        $result = $this->user_model->update($this->post("id"), $all);

        if ($result === false) {
            $this->set_response(array("status" => "failed"), REST_Controller::HTTP_CONFLICT);
        } else {
            $this->set_response(array("status" => "success"), REST_Controller::HTTP_OK);
        }
    }

    /**
     * Obtiene todos los usuarios
     * @access public
     * @example http://{host}/{site_name}/User/users/format/{formato}/X-API-KEY/{miapikey}
     * Este es el formato que debe usarse para realizar peticiones al API
     * 
     */
    public function users_get() {
        $this->load->model("user_model");
        $users = $this->user_model->get_all();
        if ($users) {
            $this->set_response($users, REST_Controller::HTTP_OK);
        } else {
            $this->set_response(NULL, REST_Controller::HTTP_NOT_FOUND);
        }
    }

}
