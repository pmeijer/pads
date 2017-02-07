/*globals define*/
/*jshint node:true, browser:true*/

/**
 * Generated by PluginGenerator 1.7.0 from webgme on Fri Feb 03 2017 15:27:19 GMT+0000 (UTC).
 * A plugin that inherits from the PluginBase. To see source code documentation about available
 * properties and methods visit %host%/docs/source/PluginBase.html.
 */

define([
    'plugin/PluginConfig',
    'text!./metadata.json',
    'plugin/PluginBase',
    'common/util/ejs',
    'pads_app/modelLoader',
    'q',
    'CreateTopology/Templates/Templates',

], function (PluginConfig,
             pluginMetadata,
             PluginBase,
             ejs,
             loader,
             Q,
             TEMPLATES) {
    'use strict';

    pluginMetadata = JSON.parse(pluginMetadata);

    /**
     * Initializes a new instance of CreateTopology.
     * @class
     * @augments {PluginBase}
     * @classdesc This class represents the plugin CreateTopology.
     * @constructor
     */
    var CreateTopology = function () {
        // Call base class' constructor.
        PluginBase.call(this);
        this.pluginMetadata = pluginMetadata;
    };

    /**
     * Metadata associated with the plugin. Contains id, name, version, description, icon, configStructue etc.
     * This is also available at the instance at this.pluginMetadata.
     * @type {object}
     */
    CreateTopology.metadata = pluginMetadata;

    // Prototypical inheritance from PluginBase.
    CreateTopology.prototype = Object.create(PluginBase.prototype);
    CreateTopology.prototype.constructor = CreateTopology;


    CreateTopology.prototype.notify = function (level, msg) {
        var self = this;
        var prefix = self.projectId + '::' + self.projectName + '::' + level + '::';
        var max_msg_len = 100;
        if (level == 'error')
            self.logger.error(msg);
        else if (level == 'debug')
            self.logger.debug(msg);
        else if (level == 'info')
            self.logger.info(msg);
        else if (level == 'warning')
            self.logger.warn(msg);
        self.createMessage(self.activeNode, msg, level);
        if (msg.length < max_msg_len)
            self.sendNotification(prefix + msg);
        else {
            var splitMsgs = utils.chunkString(msg, max_msg_len);
            splitMsgs.map(function (splitMsg) {
                self.sendNotification(prefix + splitMsg);
            });
        }
    };

    CreateTopology.prototype.convertNode = function (node) {
        var attrs = this.core.getAttributeNames(node);
        // TODO
        if (!this.core.getBaseType(node)) debugger;
        // console.log('node is', node)
        return {
            name: this.core.getAttribute(node, 'name'),
            type: this.core.getAttribute(this.core.getBaseType(node), 'name')
        };
    };

    CreateTopology.prototype.generateDataModel = function (modelNode) {
        var self = this,
            //deferred = new Q.defer(),
            dataModel = {}

        return self.core.loadSubTree(modelNode)
            .then(function (nodes) {
                // Convert the nodes to the desired structure for the template
                // TODO
                return nodes.map(function (node) {
                    return self.convertNode(node);
                });
            });
    };


    CreateTopology.prototype.generateFiles = function (nodes) {
        console.log('generating files...')
        console.log(nodes)
        // Use the datamodel to generate any artifacts from templates
        // TODO
        return '';
    };

    CreateTopology.prototype.renderTopology = function () {
        // render docker compose file with federate type + shared folder name + command

        //type = PubSubNetwork
        var self = this;




        self.nodeLink_listInfo = []
        if(self.pads_datamodel.SwitchSwitchConnection_list){
            self.pads_datamodel.SwitchSwitchConnection_list.map((m_switchlink) => {
                self.nodeLink_listInfo.push({
                    name: m_switchlink.name,
                    type: m_switchlink.type,
                    // src: m_switchlink.src.path,
                    // dst: m_switchlink.dst.path
                    src_name: m_switchlink.src.name,
                    dst_name: m_switchlink.dst.name,
                })
            })
        }

        if(self.pads_datamodel.HostSwitchConnection_list){
            self.pads_datamodel.HostSwitchConnection_list.map((m_hostswitchlink) => {
                self.nodeLink_listInfo.push({
                    name: m_hostswitchlink.name,
                    type: m_hostswitchlink.type,
                    // src: m_switchlink.src.path,
                    // dst: m_switchlink.dst.path
                    src_name: m_hostswitchlink.src.name,
                    dst_name: m_hostswitchlink.dst.name
                })
            })
        }

        // if(self.pads_datamodel.BrokerConnection_list){
        //     self.pads_datamodel.MobileHost_list.map((fed) => {
        //         self.MobileHosts_listInfo.push({
        //             name: fed.name,
        //             type: 'Mobile'
        //         })
        //     })
        // }
        // if(self.pads_datamodel.PubConnection_list){
        //     self.pads_datamodel.MobileHost_list.map((fed) => {
        //         self.MobileHosts_listInfo.push({
        //             name: fed.name,
        //             type: 'Mobile'
        //         })
        //     })
        // }

        self.hostInfo = [];

        self.brokerInfo = []
        if(self.pads_datamodel.Broker_list){
            self.pads_datamodel.Broker_list.map((m_broker) => {
                self.brokerInfo.push({
                    name: m_broker.name,
                    type: m_broker.type
                })
            })
        }
        self.publisherInfo = []
        if(self.pads_datamodel.Publisher_list){
            self.pads_datamodel.Publisher_list.map((m_pub) => {
                self.publisherInfo.push({
                    name: m_pub.name,
                    type: m_pub.type
                })
            })
        }

        self.subscriberInfo = []
        if(self.pads_datamodel.Subscriber_list){
            self.pads_datamodel.Subscriber_list.map((m_sub) => {
                self.subscriberInfo.push({
                    name: m_sub.name,
                    type:m_sub.type
                })
            })
        }
        self.switchInfo = [];
        if(self.pads_datamodel.SwitchS_list){
            self.pads_datamodel.SwitchS_list.map((m_switch) => {
                self.switchInfo.push({
                    name: m_switch.name,
                    type: m_switch.type
                })
            })
        }


        self.hostInfo = [];
        if(self.pads_datamodel.Host_list){
            self.pads_datamodel.Host_list.map((m_host) => {
                self.hostInfo.push({
                    name: m_host.name,
                    type: m_host.type
                })
            })
        }


        console.log(self.switchInfo)
        console.log(self.hostInfo)
        console.log(self.brokerInfo)
        console.log(self.subscriberInfo)
        console.log(self.publisherInfo)


        self.topologyFileData = ejs.render(
            TEMPLATES['topologyFileTemplate.ejs'],
            {
                hostInfo: self.hostInfo,
                switchInfo: self.switchInfo,
                brokerInfo: self.brokerInfo,
                publisherInfo : self.publisherInfo,
                subsciberInfo: self.subscriberInfo,
                nodeLink_listInfo: self.nodeLink_listInfo

            }
        );

        self.topologyFileData = ejs.render(
            TEMPLATES['commandFileTemplate.ejs'],
            {
                hostInfo: self.hostInfo,
                switchInfo: self.switchInfo,
                brokerInfo: self.brokerInfo,
                publisherInfo : self.publisherInfo,
                subsciberInfo: self.subscriberInfo,
                nodeLink_listInfo: self.nodeLink_listInfo

            }
        );

        var x =[];
        //
        var path = require('path'),
            filendir = require('filendir'),
            fileName = 'topology.py';

        var basePath = process.cwd();

        var deferred = Q.defer();
        filendir.writeFile(path.join(basePath, fileName), self.topologyFileData, function(err) {
            if (err){
                console.error("not able to create the file")
                deferred.reject(err);
            }

            else{
                console.log("done writing file to", path.join(basePath,fileName) )
                deferred.resolve();

            }


        });
        return deferred.promise;

        // return self.pads_datamodel;
        // self.dockerFileData = ejs.render(
        //     TEMPLATES['topologyFileTemplate.ejs'],
        //     {
        //         inputPrefix: self.inputPrefix,
        //         outputPrefix: self.outputPrefix,
        //         fedInfos: self.fedInfos,
        //         dockerInfoMap: self.dockerInfoMap
        //     }
        // );
        // var path = require('path'),
        //     filendir = require('filendir'),
        //     fileName = 'docker-compose.yml';
        //
        // var deferred = Q.defer();
        // filendir.writeFile(path.join(self.basePath, fileName), self.dockerFileData, function (err) {
        //     if (err)
        //         deferred.reject(err);
        //     else
        //         deferred.resolve();
        // });
        // return deferred.promise;
    };


    /**
     * Main function for the plugin to execute. This will perform the execution.
     * Notes:
     * - Always log with the provided logger.[error,warning,info,debug].
     * - Do NOT put any user interaction logic UI, etc. inside this method.
     * - callback always has to be called even if error happened.
     *
     * @param {function(string, plugin.PluginResult)} callback - the result callback
     */
    CreateTopology.prototype.main = function (callback) {
        // Use self to access core, project, result, logger etc from PluginBase.
        // These are all instantiated at this point.
        var self = this,
            nodeObject;


        if (typeof WebGMEGlobal !== 'undefined') {
            var msg = 'You must run this plugin on the server!';
            self.notify('error', msg);
            callback(new Error(msg), self.result);
        }

        // Using the coreAPI to make changes.
        // nodeObject = self.activeNode;

        var currentConfig = self.getCurrentConfig();

        self.projectName = self.core.getAttribute(self.rootNode, 'name');
        var modelNode = self.activeNode;
        self.modelName = self.core.getAttribute(modelNode, 'name');

        // self.generateDataModel(self.activeNode)  // Convert subtree to template-friendly format
        //     .then(function (dataModel) {
        //         self.logger.info('Converted subtree to temp[late-friendcly forfamat');
        //         self.logger.info(JSON.stringify(dataModel, null, 4));
        //         return self.generateFiles(dataModel);
        //     })
        //     .then(function () {
        //         // TODO: Add the files as an artifact
        //         self.result.setSuccess(true);
        //         callback(null, self.result);
        //     })
        //     .catch(function (err) {
        //         self.logger.error(err);
        //         self.createMessage(null, err.message, 'error');
        //         self.result.setSuccess(false);
        //         callback(null, self.result);
        //     })
        //     .done();


        return loader.loadModel(self.core, modelNode)
            .then(function (pads_datamodel) {
                console.log(pads_datamodel)
                self.pads_datamodel = pads_datamodel;
            })
            .then(function() {
                return self.renderTopology();
            })
            // .then(function() {
            //     return self.copyArtifacts();
            // })
            .then(function () {
                self.result.success = true;
                self.notify('info', 'Simulation Complete.');
                callback(null, self.result);
            })
            .catch(function (err) {
                self.notify('error', err);
                self.result.success = false;
                callback(err, self.result);
            });
    };

    return CreateTopology;
})
;
