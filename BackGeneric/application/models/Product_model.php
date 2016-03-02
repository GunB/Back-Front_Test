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
 * Description of Api_model
 *
 * @author Heiner
 */
class Product_model extends CI_Model {
    
    var $TABLE = 'product';

    public function get($id) {
        $query = $this->db->get_where($this->TABLE, array("id" => $id));
        if ($query->num_rows() == 1) {
            return $query->row();
        }
    }

    public function get_condition(array $array_conditions) {
        $query = $this->db->get_where($this->TABLE, $array_conditions);
        if ($query->num_rows() == 1) {
            $row = $query->row();
            return $row;
        }
    }

    public function get_all() {
        $query = $this->db->get($this->TABLE);
        if ($query->num_rows() > 0) {
            return $query->result();
        }
    }

    public function create(array $array_data) {
        $data = $array_data;
        return $this->db->insert($this->TABLE, $data);
    }

}
