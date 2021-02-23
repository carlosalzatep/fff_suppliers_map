<?php
// Edit name and class according to your files, keep camelcase for class name.
//require_once _PS_MODULE_DIR_.'fff_map_suppliers/fff_map_suppliers.php';
require_once(dirname(__FILE__) . '/../../fff_map_suppliers.php');

class fff_map_suppliersAjaxModuleFrontController extends ModuleFrontController
{
    public function initContent()
    {

        $module = new Fff_map_suppliers;

        // You may should do some security work here, like checking an hash from your module
        if (Tools::isSubmit('action')) {

            // Usefull vars derivated from getContext
            $context = Context::getContext();
            $cart = $context->cart;
            $cookie = $context->cookie;
            $customer = $context->customer;
            $id_lang = $cookie->id_lang;

            // Default response with translation from the module
            $response = array('status' => false, "message" => $module->l('Nothing here.'));

            switch (Tools::getValue('action')) {

                case 'action_name':

                    // Edit default response and do some work here
                    $response = array('status' => true, "message" => $module->l('It works !'));

                    break;

                default:
                    break;

            }
        }

        // Classic json response
        $json = Tools::jsonEncode($response);
        var_dump($json);
        echo "response=".$json;
        die;

        // For displaying like any other use this method to assign and display your template placed in modules/modulename/views/template/front/...
        // Just put some vars in your template
        // $this->context->smarty->assign(array('var1'=>'value1'));
        // $this->setTemplate('template.tpl');

        // For sending a template in ajax use this method
        // $this->context->smarty->fetch('template.tpl');

    }
}

?>