<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

//use PrestaShop\PrestaShop\Core\Module\WidgetInterface;

class Fff_map_suppliers extends Module/* implements WidgetInterface*/
{
    protected $config_form = false;
    protected $GoogleAPIKey = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

    public function __construct()
    {
        $this->name = 'fff_map_suppliers';
        $this->tab = 'front_office_features';
        $this->version = '1.0.0';
        $this->author = 'Gradiweb';
        $this->need_instance = 0;

        /**
         * Set $this->bootstrap to true if your module is compliant with bootstrap (PrestaShop 1.6)
         */
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('Suppliers Map');
        $this->description = $this->l('Suppliers search map');

        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);
    }

    public function install()
    {
        //Configuration::updateValue('FFF_MAP_SUPPLIERS_LIVE_MODE', false);
        Configuration::updateValue('FFF_MAP_SUPPLIERS_PAGE_TITLE', 'Map Créateurs');
        Configuration::updateValue('FFF_MAP_SUPPLIERS_PAGE_SUBTITLE', 'Discover and shop innovated new products from local makers and small buiness.');
        Configuration::updateValue('FFF_MAP_SUPPLIERS_HOME_TITLE', 'Nos producteurs partout en France');

        return parent::install() &&
        $this->registerHook('header') &&
        $this->registerHook('supplierMap') &&
        $this->registerHook('backOfficeHeader') && 
        $this->registerHook('displayHome');
    }

    public function uninstall()
    {
        //Configuration::deleteByName('FFF_MAP_SUPPLIERS_LIVE_MODE');
        Configuration::deleteByName('FFF_MAP_SUPPLIERS_PAGE_TITLE');
        Configuration::deleteByName('FFF_MAP_SUPPLIERS_PAGE_SUBTITLE');
        Configuration::deleteByName('FFF_MAP_SUPPLIERS_HOME_TITLE');

        return parent::uninstall();
    }

    /**
     * Load the configuration form
     */
    public function getContent()
    {
        /**
         * If values have been submitted in the form, process.
         */
        if (((bool)Tools::isSubmit('submitFff_map_suppliersModule')) == true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');

        return $output.$this->renderForm();
    }

    /**
     * Create the form that will be displayed in the configuration of your module.
     */
    protected function renderForm()
    {
        $helper = new HelperForm();

        $helper->show_toolbar = false;
        $helper->table = $this->table;
        $helper->module = $this;
        $helper->default_form_language = $this->context->language->id;
        $helper->allow_employee_form_lang = Configuration::get('PS_BO_ALLOW_EMPLOYEE_FORM_LANG', 0);

        $helper->identifier = $this->identifier;
        $helper->submit_action = 'submitFff_map_suppliersModule';
        $helper->currentIndex = $this->context->link->getAdminLink('AdminModules', false)
            .'&configure='.$this->name.'&tab_module='.$this->tab.'&module_name='.$this->name;
        $helper->token = Tools::getAdminTokenLite('AdminModules');

        $helper->tpl_vars = array(
            'fields_value' => $this->getConfigFormValues(), /* Add values for your inputs */
            'languages' => $this->context->controller->getLanguages(),
            'id_language' => $this->context->language->id,
        );

        return $helper->generateForm(array($this->getConfigForm()));
    }

    /**
     * Create the structure of your form.
     */
    protected function getConfigForm()
    {
        return array(
            'form' => array(
                'legend' => array(
                'title' => $this->l('PARAMÈTRES'),
                'icon' => 'icon-cogs',
                ),
                'input' => array(
                    array(
                        'type' => 'text',
                        'label' => $this->l('Titre maison'),
                        'name' => 'FFF_MAP_SUPPLIERS_HOME_TITLE',
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Titre de la page intérieure'),
                        'name' => 'FFF_MAP_SUPPLIERS_PAGE_TITLE',
                    ),
                    array(
                        'type' => 'text',
                        'label' => $this->l('Sous-titre de la page intérieure'),
                        'name' => 'FFF_MAP_SUPPLIERS_PAGE_SUBTITLE',
                    ),
                ),
                'submit' => array(
                    'title' => $this->l('Save'),
                ),
            ),
        );
    }

    /**
     * Set values for the inputs.
     */
    protected function getConfigFormValues()
    {
        return array(
            'FFF_MAP_SUPPLIERS_PAGE_TITLE' => Configuration::get('FFF_MAP_SUPPLIERS_PAGE_TITLE', 'Map Créateurs'),
            'FFF_MAP_SUPPLIERS_PAGE_SUBTITLE' => Configuration::get('FFF_MAP_SUPPLIERS_PAGE_SUBTITLE', 'Discover and shop innovated new products from local makers and small buiness.'),
            'FFF_MAP_SUPPLIERS_HOME_TITLE' => Configuration::get('FFF_MAP_SUPPLIERS_HOME_TITLE', 'Nos producteurs partout en France'),
        );
    }

    /**
     * Save form data.
     */
    protected function postProcess()
    {
        $form_values = $this->getConfigFormValues();

        foreach (array_keys($form_values) as $key) {
            Configuration::updateValue($key, Tools::getValue($key));
        }
    }

    /**
    * Add the CSS & JavaScript files you want to be loaded in the BO.
    */
    public function hookBackOfficeHeader()
    {
        if (Tools::getValue('module_name') == $this->name) {
            $this->context->controller->addJS($this->_path.'views/js/back.js');
            $this->context->controller->addCSS($this->_path.'views/css/back.css');
        }
    }

    /**
     * Add the CSS & JavaScript files you want to be added on the FO.
     */
    public function hookHeader()
    {
        
        if($this->context->controller->php_self == 'suppliermap'){
            $this->context->controller->addCSS($this->_path.'views/css/bootstrap.min.css');
            $this->context->controller->addJS($this->_path.'views/js/pagination.min.js');
            $this->context->controller->addJS($this->_path.'views/js/front.js');
            $this->context->controller->addCSS($this->_path.'views/css/front.css');
        }
        elseif($this->context->controller->php_self == 'index'){
            $this->context->controller->addJS($this->_path.'views/js/home.js');
            $this->context->controller->addCSS($this->_path.'views/css/home.css');
        }
    }

    public function hookSupplierMap(){
        //Go with override/controllers/front/SuppliermapController 
        $this->context->smarty->assign(
            array(
                'GoogleAPIKey' => $this->GoogleAPIKey,
                'FFF_MAP_SUPPLIERS_PAGE_TITLE' => Configuration::get('FFF_MAP_SUPPLIERS_PAGE_TITLE'),
                'FFF_MAP_SUPPLIERS_PAGE_SUBTITLE' => Configuration::get('FFF_MAP_SUPPLIERS_PAGE_SUBTITLE'),
            )
        );
        return $this->display(__FILE__, 'views/templates/hook/fff_map_supplier_front.tpl');
    }

    public function hookDisplayHome(){
        $suppliersVar = $this->getTemplateVarSuppliers();
        $this->context->smarty->assign(
            array(
                'GoogleAPIKey' => $this->GoogleAPIKey,
                'FFF_MAP_SUPPLIERS_HOME_TITLE' => Configuration::get('FFF_MAP_SUPPLIERS_HOME_TITLE'),
                'Mapsupplier' => $suppliersVar,
            )
        );

        return $this->display(__FILE__, 'views/templates/hook/fff_map_supplier_home.tpl');
    }


    public function getTemplateVarSuppliers()
    {
        $suppliers = Supplier::getSuppliers(false, $this->context->language->id, true);
        $suppliers_for_display = array();

        $itera = 0;
        foreach ($suppliers as $supplier) {
            $suppliers_for_display[$itera]['id_supplier'] = $supplier['id_supplier'];
            $suppliers_for_display[$itera]['name'] = $supplier['name'];
            $suppliers_for_display[$itera]['latitude'] = $supplier['latitude'];
            $suppliers_for_display[$itera]['longitude'] = $supplier['longitude'];
            $suppliers_for_display[$itera]['image'] = $this->context->link->getSupplierImageLink($supplier['id_supplier'], 'small_default');
            $suppliers_for_display[$itera]['url'] = $this->context->link->getsupplierLink($supplier['id_supplier']);
            $itera++;
        }

        return $suppliers_for_display;
    }

}
