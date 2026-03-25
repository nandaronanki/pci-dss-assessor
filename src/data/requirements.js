// PCI DSS v2.0 ROC Reporting Instructions - Requirement 1
// Install and maintain a firewall configuration to protect cardholder data

export const STATUS = {
  NOT_ASSESSED: 'not_assessed',
  IN_PLACE: 'in_place',
  NOT_IN_PLACE: 'not_in_place',
  NOT_APPLICABLE: 'not_applicable',
  IN_PROGRESS: 'in_progress'
};

export const STATUS_LABELS = {
  [STATUS.NOT_ASSESSED]: 'Not Assessed',
  [STATUS.IN_PLACE]: 'In Place',
  [STATUS.NOT_IN_PLACE]: 'Not In Place',
  [STATUS.NOT_APPLICABLE]: 'N/A',
  [STATUS.IN_PROGRESS]: 'In Progress'
};

export const STATUS_COLORS = {
  [STATUS.NOT_ASSESSED]: 'bg-gray-100 text-gray-600 border-gray-300',
  [STATUS.IN_PLACE]: 'bg-emerald-50 text-emerald-700 border-emerald-300',
  [STATUS.NOT_IN_PLACE]: 'bg-red-50 text-red-700 border-red-300',
  [STATUS.NOT_APPLICABLE]: 'bg-slate-50 text-slate-600 border-slate-300',
  [STATUS.IN_PROGRESS]: 'bg-amber-50 text-amber-700 border-amber-300'
};

export const METHODOLOGY = {
  OBSERVE: 'Observe system settings/configurations',
  DOCUMENT: 'Document reviews',
  INTERVIEW: 'Interviews with personnel',
  PROCESS: 'Observe process/action/state',
  SAMPLE: 'Identify sample'
};

export const REQUIREMENT_SECTIONS = [
  {
    id: 'req1',
    number: '1',
    title: 'Install and maintain a firewall configuration to protect cardholder data',
    subsections: [
      {
        id: 'req1.1',
        number: '1.1',
        title: 'Establish firewall and router configuration standards',
        description: 'Establish firewall and router configuration standards that include the following:'
      },
      {
        id: 'req1.2',
        number: '1.2',
        title: 'Build firewall and router configurations that restrict connections',
        description: 'Build firewall and router configurations that restrict connections between untrusted networks and any system components in the cardholder data environment. Note: An "untrusted network" is any network that is external to the networks belonging to the entity under review, and/or which is out of the entity\'s ability to control or manage.'
      },
      {
        id: 'req1.3',
        number: '1.3',
        title: 'Prohibit direct public access between the Internet and any system component in the cardholder data environment',
        description: 'Prohibit direct public access between the Internet and any system component in the cardholder data environment.'
      },
      {
        id: 'req1.4',
        number: '1.4',
        title: 'Install personal firewall software on mobile/employee-owned computers',
        description: 'Install personal firewall software on any mobile and/or employee-owned computers with direct connectivity to the Internet which are used to access the organization\'s network.'
      }
    ]
  }
];

export const requirements = [
  // 1.1 - Parent requirement (header only)
  {
    id: 'req1.1',
    section: '1.1',
    requirement: 'Establish firewall and router configuration standards that include the following:',
    testingProcedure: 'Obtain and inspect the firewall and router configuration standards and other documentation specified below to verify that standards are complete. Complete the following:',
    isParent: true,
    parentSection: '1.1',
    rocDetails: [],
    methodology: [],
    tags: ['firewall', 'router', 'configuration', 'standards']
  },

  // 1.1.1
  {
    id: 'req1.1.1',
    section: '1.1.1',
    requirement: 'A formal process for approving and testing all network connections and changes to the firewall and router configurations',
    testingProcedure: 'Verify that there is a formal process for testing and approval of all network connections and changes to firewall and router configurations.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'Identify the document(s) which defines the formal processes for: (i) Testing of all network connections, (ii) Approval of all network connections, (iii) Testing of all firewall configuration changes, (iv) Approval of all firewall configuration changes, (v) Testing of all router configuration changes, (vi) Approval of all router configuration changes',
      'Describe how the documented processes were observed to be implemented, for: (i) Testing of all network connections, (ii) Approval of all network connections, (iii) Testing of all firewall configuration changes, (iv) Approval of all firewall configuration changes, (v) Testing of all router configuration changes, (vi) Approval of all router configuration changes'
    ],
    methodology: ['DOCUMENT', 'PROCESS'],
    tags: ['firewall', 'router', 'change management', 'approval', 'testing', 'network connections']
  },

  // 1.1.2.a
  {
    id: 'req1.1.2a',
    section: '1.1.2.a',
    requirement: 'Current network diagram with all connections to cardholder data, including any wireless networks',
    testingProcedure: 'Verify that a current network diagram exists (for example, one that shows cardholder data flows over the network) and that it documents all connections to cardholder data, including any wireless networks.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'Identify the current network diagram(s).',
      'Describe how observed network connections confirm that the diagram: (i) Is current, (ii) Includes all connections to cardholder data, (iii) Includes any wireless network connections'
    ],
    methodology: ['DOCUMENT', 'PROCESS'],
    tags: ['network diagram', 'cardholder data', 'wireless', 'data flow']
  },

  // 1.1.2.b
  {
    id: 'req1.1.2b',
    section: '1.1.2.b',
    requirement: 'Current network diagram is kept current',
    testingProcedure: 'Verify that the diagram is kept current.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'Identify the document requiring that the network diagram is kept current.',
      'Describe the documented process for keeping the network diagram current.',
      'Identify the responsible personnel interviewed who confirm the documented process is followed.'
    ],
    methodology: ['DOCUMENT', 'INTERVIEW'],
    tags: ['network diagram', 'documentation', 'maintenance']
  },

  // 1.1.3.a
  {
    id: 'req1.1.3a',
    section: '1.1.3.a',
    requirement: 'Requirements for a firewall at each Internet connection and between any DMZ and the internal network zone',
    testingProcedure: 'Verify that firewall configuration standards include requirements for a firewall at each Internet connection and between any DMZ and the internal network zone.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'Identify the firewall configuration standards that define requirements for: (i) A firewall at each Internet connection, (ii) A firewall between any DMZ and the internal network zone'
    ],
    methodology: ['DOCUMENT'],
    tags: ['firewall', 'internet', 'DMZ', 'internal network', 'perimeter']
  },

  // 1.1.3.b
  {
    id: 'req1.1.3b',
    section: '1.1.3.b',
    requirement: 'Current network diagram is consistent with the firewall configuration standards',
    testingProcedure: 'Verify that the current network diagram is consistent with the firewall configuration standards.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'Identify the current network diagrams and firewall configuration standards reviewed.',
      'Describe how the reviewed documents were confirmed to be consistent with one another.'
    ],
    methodology: ['DOCUMENT'],
    tags: ['network diagram', 'firewall', 'configuration standards', 'consistency']
  },

  // 1.1.4
  {
    id: 'req1.1.4',
    section: '1.1.4',
    requirement: 'Description of groups, roles, and responsibilities for logical management of network components',
    testingProcedure: 'Verify that firewall and router configuration standards include a description of groups, roles, and responsibilities for logical management of network components.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'Identify the firewall configuration standards that include descriptions of the following for logical management of components: (i) Groups, (ii) Roles, (iii) Responsibilities',
      'Identify the router configuration standards that include descriptions of the following for logical management of components: (i) Groups, (ii) Roles, (iii) Responsibilities',
      'Identify the personnel holding those roles and responsibilities who were interviewed, and who confirm that the roles and responsibilities are assigned as documented for: (i) Logical management of router components, (ii) Logical management of firewall components'
    ],
    methodology: ['DOCUMENT', 'INTERVIEW'],
    tags: ['roles', 'responsibilities', 'groups', 'management', 'firewall', 'router']
  },

  // 1.1.5.a
  {
    id: 'req1.1.5a',
    section: '1.1.5.a',
    requirement: 'Documentation and business justification for use of all services, protocols, and ports allowed',
    testingProcedure: 'Verify that firewall and router configuration standards include a documented list of services, protocols and ports necessary for business\u2014for example, HTTP, SSL, SSH, and VPN protocols.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'For each of the following, identify the firewall configuration standards which define those necessary for business, including a business justification for each: (i) Services, (ii) Protocols, (iii) Ports',
      'For each of the following, identify the router configuration standards which define those necessary for business, including a business justification for each: (i) Services, (ii) Protocols, (iii) Ports'
    ],
    methodology: ['DOCUMENT'],
    tags: ['services', 'protocols', 'ports', 'business justification', 'HTTP', 'SSL', 'SSH', 'VPN']
  },

  // 1.1.5.b
  {
    id: 'req1.1.5b',
    section: '1.1.5.b',
    requirement: 'Identify insecure services, protocols, and ports allowed; verify security features are documented and implemented',
    testingProcedure: 'Identify insecure services, protocols, and ports allowed; and verify they are necessary and that security features are documented and implemented by examining firewall and router configuration standards and settings for each service.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'Identify whether any insecure services, protocols or ports are allowed.',
      'For each insecure service, protocol and port allowed: (i) Identify the documented justification, (ii) Identify the responsible personnel interviewed who confirm that each insecure service/protocol/port is necessary, (iii) Identify the firewall and router configuration standards which define the security features required for each insecure service/protocol/port, (iv) Describe how observed firewall configurations verify the security features are implemented, (v) Describe how observed router configurations verify the security features are implemented.'
    ],
    methodology: ['OBSERVE', 'INTERVIEW', 'PROCESS'],
    tags: ['insecure services', 'protocols', 'ports', 'security features', 'FTP', 'Telnet', 'POP3', 'IMAP', 'SNMP']
  },

  // 1.1.6.a
  {
    id: 'req1.1.6a',
    section: '1.1.6.a',
    requirement: 'Requirement to review firewall and router rule sets at least every six months',
    testingProcedure: 'Verify that firewall and router configuration standards require review of firewall and router rule sets at least every six months.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'Identify the firewall configuration standards that require a review of firewall rule sets at least every six months.',
      'Identify the router configuration standards that require a review of router rule sets at least every six months.'
    ],
    methodology: ['DOCUMENT'],
    tags: ['rule sets', 'review', 'six months', 'firewall', 'router']
  },

  // 1.1.6.b
  {
    id: 'req1.1.6b',
    section: '1.1.6.b',
    requirement: 'Obtain and examine documentation to verify rule sets are reviewed at least every six months',
    testingProcedure: 'Obtain and examine documentation to verify that the rule sets are reviewed at least every six months.',
    isParent: false,
    parentSection: '1.1',
    rocDetails: [
      'Identify documented results of previous: (i) Firewall rule set reviews, (ii) Router rule set reviews',
      'Identify the responsible personnel interviewed who confirm that: (i) Firewall rule set reviews are completed at least every six months, (ii) Router rule set reviews are completed at least every six months.'
    ],
    methodology: ['DOCUMENT', 'INTERVIEW'],
    tags: ['rule sets', 'review', 'six months', 'documentation', 'evidence']
  },

  // 1.2 - Parent requirement (header only)
  {
    id: 'req1.2',
    section: '1.2',
    requirement: 'Build firewall and router configurations that restrict connections between untrusted networks and any system components in the cardholder data environment.',
    testingProcedure: 'Examine firewall and router configurations to verify that connections are restricted between untrusted networks and system components in the cardholder data environment, as follows:',
    isParent: true,
    parentSection: '1.2',
    rocDetails: [],
    methodology: [],
    tags: ['firewall', 'router', 'untrusted networks', 'cardholder data environment']
  },

  // 1.2.1.a
  {
    id: 'req1.2.1a',
    section: '1.2.1.a',
    requirement: 'Restrict inbound and outbound traffic to that which is necessary for the cardholder data environment',
    testingProcedure: 'Verify that inbound and outbound traffic is limited to that which is necessary for the cardholder data environment, and that the restrictions are documented.',
    isParent: false,
    parentSection: '1.2',
    rocDetails: [
      'Describe how observed firewall/router configurations limit traffic to that which is necessary for the cardholder data environment: (i) Inbound, (ii) Outbound',
      'Identify the document that defines the restrictions and confirm this is consistent with the observed configurations: (i) Inbound, (ii) Outbound',
      'Describe how inbound and outbound traffic was observed to be limited to that which is necessary for the cardholder data environment: (i) Inbound, (ii) Outbound'
    ],
    methodology: ['OBSERVE', 'DOCUMENT', 'PROCESS'],
    tags: ['inbound', 'outbound', 'traffic', 'restrict', 'cardholder data environment']
  },

  // 1.2.1.b
  {
    id: 'req1.2.1b',
    section: '1.2.1.b',
    requirement: 'All other inbound and outbound traffic is specifically denied (e.g., explicit "deny all" or implicit deny after allow)',
    testingProcedure: 'Verify that all other inbound and outbound traffic is specifically denied, for example by using an explicit "deny all" or an implicit deny after allow statement.',
    isParent: false,
    parentSection: '1.2',
    rocDetails: [
      'Describe how firewall and router configurations were observed to specifically deny all other traffic: (i) Inbound, (ii) Outbound'
    ],
    methodology: ['OBSERVE'],
    tags: ['deny all', 'implicit deny', 'inbound', 'outbound', 'traffic']
  },

  // 1.2.2
  {
    id: 'req1.2.2',
    section: '1.2.2',
    requirement: 'Secure and synchronize router configuration files',
    testingProcedure: 'Verify that router configuration files are secure and synchronized\u2014for example, running configuration files (used for normal running of the routers) and start-up configuration files (used when machines are re-booted), have the same, secure configurations.',
    isParent: false,
    parentSection: '1.2',
    rocDetails: [
      'Describe how the router configuration files were observed to be secured.',
      'Describe how the router configuration files were observed to be synchronized.'
    ],
    methodology: ['OBSERVE', 'PROCESS'],
    tags: ['router', 'configuration files', 'secure', 'synchronized', 'startup', 'running']
  },

  // 1.2.3
  {
    id: 'req1.2.3',
    section: '1.2.3',
    requirement: 'Install perimeter firewalls between any wireless networks and the cardholder data environment',
    testingProcedure: 'Verify that there are perimeter firewalls installed between any wireless networks and systems that store cardholder data, and that these firewalls deny or control (if such traffic is necessary for business purposes) any traffic from the wireless environment into the cardholder data environment.',
    isParent: false,
    parentSection: '1.2',
    rocDetails: [
      'Describe how firewalls were observed to be in place between any wireless networks and systems that store cardholder data.',
      'Describe how firewall configurations were observed to deny or control all traffic from any wireless environment into the cardholder data environment.',
      'Identify the responsible personnel interviewed who confirm that any permitted traffic from the wireless environment into the cardholder data environment is necessary for business purposes.'
    ],
    methodology: ['OBSERVE', 'INTERVIEW', 'PROCESS'],
    tags: ['wireless', 'perimeter firewall', 'cardholder data', 'deny', 'control']
  },

  // 1.3 - Parent requirement (header only)
  {
    id: 'req1.3',
    section: '1.3',
    requirement: 'Prohibit direct public access between the Internet and any system component in the cardholder data environment.',
    testingProcedure: 'Examine firewall and router configurations\u2014including but not limited to the choke router at the Internet, the DMZ router and firewall, the DMZ cardholder segment, the perimeter router, and the internal cardholder network segment\u2014to determine that there is no direct access between the Internet and system components in the internal cardholder network segment, as detailed below.',
    isParent: true,
    parentSection: '1.3',
    rocDetails: [],
    methodology: [],
    tags: ['DMZ', 'internet', 'direct access', 'cardholder data environment', 'perimeter']
  },

  // 1.3.1
  {
    id: 'req1.3.1',
    section: '1.3.1',
    requirement: 'Implement a DMZ to limit inbound traffic to only system components that provide authorized publicly accessible services, protocols, and ports',
    testingProcedure: 'Verify that a DMZ is implemented to limit inbound traffic to only system components that provide authorized publicly accessible services, protocols, and ports.',
    isParent: false,
    parentSection: '1.3',
    rocDetails: [
      'Identify the document defining system components that provide authorized publicly accessible services, protocols, and ports.',
      'Describe how observed firewall/router configurations ensure that the DMZ limits inbound traffic to only those system components.'
    ],
    methodology: ['OBSERVE', 'DOCUMENT'],
    tags: ['DMZ', 'inbound traffic', 'publicly accessible', 'services', 'protocols', 'ports']
  },

  // 1.3.2
  {
    id: 'req1.3.2',
    section: '1.3.2',
    requirement: 'Limit inbound Internet traffic to IP addresses within the DMZ',
    testingProcedure: 'Verify that inbound Internet traffic is limited to IP addresses within the DMZ.',
    isParent: false,
    parentSection: '1.3',
    rocDetails: [
      'Describe how observed firewall/router configurations limit inbound Internet traffic to IP addresses within the DMZ.',
      'Describe how inbound Internet traffic was observed to be limited to IP addresses within the DMZ.'
    ],
    methodology: ['OBSERVE', 'PROCESS'],
    tags: ['inbound', 'internet traffic', 'IP addresses', 'DMZ']
  },

  // 1.3.3
  {
    id: 'req1.3.3',
    section: '1.3.3',
    requirement: 'Do not allow any direct connections inbound or outbound for traffic between the Internet and the cardholder data environment',
    testingProcedure: 'Verify direct connections inbound or outbound are not allowed for traffic between the Internet and the cardholder data environment.',
    isParent: false,
    parentSection: '1.3',
    rocDetails: [
      'Identify the network documents/diagrams specifying that direct connections are not allowed for traffic between the Internet and the cardholder data environment: (i) Inbound, (ii) Outbound',
      'Describe how observed firewall/router configurations prevent direct connections between Internet and the cardholder data environment: (i) Inbound, (ii) Outbound',
      'Describe how observed traffic between the Internet and the cardholder data environment confirms that direct connections are not permitted: (i) Inbound, (ii) Outbound'
    ],
    methodology: ['OBSERVE', 'DOCUMENT', 'PROCESS'],
    tags: ['direct connections', 'internet', 'cardholder data environment', 'inbound', 'outbound']
  },

  // 1.3.4
  {
    id: 'req1.3.4',
    section: '1.3.4',
    requirement: 'Do not allow internal addresses to pass from the Internet into the DMZ',
    testingProcedure: 'Verify that internal addresses cannot pass from the Internet into the DMZ.',
    isParent: false,
    parentSection: '1.3',
    rocDetails: [
      'Describe how observed firewall/router configurations prevent internal addresses passing from the Internet into the DMZ.',
      'Describe how observed traffic from the Internet into the DMZ confirms that internal addresses cannot pass from the Internet into the DMZ.'
    ],
    methodology: ['OBSERVE', 'PROCESS'],
    tags: ['internal addresses', 'internet', 'DMZ', 'anti-spoofing']
  },

  // 1.3.5
  {
    id: 'req1.3.5',
    section: '1.3.5',
    requirement: 'Do not allow unauthorized outbound traffic from the cardholder data environment to the Internet',
    testingProcedure: 'Verify that outbound traffic from the cardholder data environment to the Internet is explicitly authorized.',
    isParent: false,
    parentSection: '1.3',
    rocDetails: [
      'Identify the document that explicitly defines authorized outbound traffic from the cardholder data environment to the Internet.',
      'Describe how firewall/router configurations were observed to allow only explicitly authorized traffic.',
      'Describe how observed outbound traffic from the cardholder data environment to the Internet confirms that only explicitly authorized traffic is allowed.'
    ],
    methodology: ['OBSERVE', 'DOCUMENT', 'PROCESS'],
    tags: ['outbound traffic', 'cardholder data environment', 'internet', 'authorized']
  },

  // 1.3.6
  {
    id: 'req1.3.6',
    section: '1.3.6',
    requirement: 'Implement stateful inspection, also known as dynamic packet filtering (only "established" connections are allowed into the network)',
    testingProcedure: 'Verify that the firewall performs stateful inspection (dynamic packet filtering). Only established connections should be allowed in, and only if they are associated with a previously established session.',
    isParent: false,
    parentSection: '1.3',
    rocDetails: [
      'Describe how observed firewall configurations implement stateful inspection.',
      'Describe how observed network traffic confirms that stateful inspection is implemented (that is, only "established" connections are allowed into the network).'
    ],
    methodology: ['OBSERVE', 'PROCESS'],
    tags: ['stateful inspection', 'dynamic packet filtering', 'established connections']
  },

  // 1.3.7
  {
    id: 'req1.3.7',
    section: '1.3.7',
    requirement: 'Place system components that store cardholder data (such as a database) in an internal network zone, segregated from the DMZ and other untrusted networks',
    testingProcedure: 'Verify that system components that store cardholder data are on an internal network zone, segregated from the DMZ and other untrusted networks.',
    isParent: false,
    parentSection: '1.3',
    rocDetails: [
      'For all system components that store cardholder data: (i) Identify the diagrams and/or other document(s) which define how system components are located on an internal network zone, segregated from the DMZ and other untrusted networks, (ii) Describe how observed network and system configurations confirm the system components are located on an internal network zone, segregated from the DMZ and other untrusted networks, (iii) Describe how observed network traffic confirms that the system components are located on an internal network zone, segregated from the DMZ and other untrusted networks.'
    ],
    methodology: ['OBSERVE', 'DOCUMENT', 'PROCESS'],
    tags: ['cardholder data', 'internal network zone', 'segregation', 'DMZ', 'database']
  },

  // 1.3.8.a
  {
    id: 'req1.3.8a',
    section: '1.3.8.a',
    requirement: 'Do not disclose private IP addresses and routing information to unauthorized parties \u2014 methods are in place',
    testingProcedure: 'Verify that methods are in place to prevent the disclosure of private IP addresses and routing information from internal networks to the Internet.',
    isParent: false,
    parentSection: '1.3',
    rocDetails: [
      'Identify the document defining methods to prevent the disclosure of private IP addresses and routing information from internal networks to the Internet.',
      'Briefly describe the methods in place.',
      'Describe how observed firewall/router configurations prevent private IP addresses and routing information from being disclosed to the Internet.',
      'Describe how observed network traffic confirms that private IP addresses and routing information are not disclosed to the Internet.'
    ],
    methodology: ['OBSERVE', 'DOCUMENT', 'PROCESS'],
    tags: ['private IP', 'routing information', 'disclosure', 'NAT', 'proxy']
  },

  // 1.3.8.b
  {
    id: 'req1.3.8b',
    section: '1.3.8.b',
    requirement: 'Do not disclose private IP addresses and routing information \u2014 any authorized disclosure is authorized',
    testingProcedure: 'Verify that any disclosure of private IP addresses and routing information to external entities is authorized.',
    isParent: false,
    parentSection: '1.3',
    rocDetails: [
      'Identify the document that specifies whether any disclosure of private IP addresses and routing information to external parties is permitted.',
      'For each permitted disclosure, identify the responsible personnel interviewed who confirm that the disclosure is authorized.',
      'Describe how observed configurations ensure that any disclosure of private IP addresses and routing information to external entities is authorized.'
    ],
    methodology: ['OBSERVE', 'INTERVIEW', 'PROCESS'],
    tags: ['private IP', 'routing information', 'authorized disclosure', 'external entities']
  },

  // 1.4 - Parent requirement (header only)
  {
    id: 'req1.4',
    section: '1.4',
    requirement: 'Install personal firewall software on any mobile and/or employee-owned computers with direct connectivity to the Internet, which are used to access the organization\'s network.',
    testingProcedure: 'Verify that mobile and/or employee-owned computers with direct connectivity to the Internet and which are used to access the organization\'s network have personal firewall software installed and active.',
    isParent: true,
    parentSection: '1.4',
    rocDetails: [],
    methodology: [],
    tags: ['personal firewall', 'mobile', 'employee-owned', 'direct connectivity']
  },

  // 1.4.a
  {
    id: 'req1.4a',
    section: '1.4.a',
    requirement: 'Verify personal firewall software is installed and active on mobile/employee-owned computers',
    testingProcedure: 'Verify that mobile and/or employee-owned computers with direct connectivity to the Internet (for example, laptops used by employees), which are used to access the organization\'s network, have personal firewall software installed and active.',
    isParent: false,
    parentSection: '1.4',
    rocDetails: [
      'Identify whether mobile and/or employee-owned computers with direct connectivity to the Internet are used to access the organization\'s network.',
      'Identify the document requiring that mobile and/or employee-owned computers with direct connectivity to the Internet have personal firewall software: (i) Installed, (ii) Active',
      'Describe how personal firewall software was observed on mobile and/or employee-owned computers to be: (i) Installed, (ii) Active'
    ],
    methodology: ['OBSERVE', 'DOCUMENT', 'PROCESS'],
    tags: ['personal firewall', 'mobile', 'employee-owned', 'laptop', 'installed', 'active']
  },

  // 1.4.b
  {
    id: 'req1.4b',
    section: '1.4.b',
    requirement: 'Verify personal firewall software is configured by the organization and is not alterable by users',
    testingProcedure: 'Verify that the personal firewall software is configured by the organization to specific standards and is not alterable by users of mobile and/or employee-owned computers.',
    isParent: false,
    parentSection: '1.4',
    rocDetails: [
      'Identify the document defining personal firewall software configuration standards.',
      'Describe how personal firewall software on mobile and/or employee-owned computers was observed to be: (i) Configured by the organization to the documented configuration standards, (ii) Not alterable by mobile and/or employee-owned computer users'
    ],
    methodology: ['OBSERVE', 'DOCUMENT'],
    tags: ['personal firewall', 'configuration standards', 'not alterable', 'organization managed']
  }
];
