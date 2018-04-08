#date(2018-4-8)
#参考书籍：图解TCP_IP.第五版

术语解释
	TCP(Transmission Control Protocal)
	UDP(Duser Uatagram Protocal)
    MAC(Media Access Control)
	bps:Bits Per Scend;
	传输速率又称带宽(Bandwidth);
	网卡(全称为网络接口卡,Network Information Center)又称网络适配器，LAN卡;
	ATM(Asynchronous Tranfer Mode)异步传输方式
	VLAN(Virtual Local Area Network)
	WLAN(Wireless Local Area Network)
	PPP(Point to Point Protocal)
	FDDI(Fiber Distributed Data Interface)光纤分布式数据接口
网络基本介绍
-------
1)OSI(Open System Interconection)和TCP/IP 
	OSI共有七层：
	 	(1)应用层
	 		小明对小花说：你好，小花。
	 	(2)表示层
	 		用普通话
	 	(3)会话层
	 		每天说一次，还是马上就说一次
	 	(4)传输层
	 		传输信息，小花是否收到问候
	 	(5)网络层
	 		在网络与网络相互连接的环境中，将数据从发送端主机发送到接收端主机。负责将数据发给目的地址。
	 	(6)数据链路层
	 		通过传输介质互联的设备之间进行数据处理，只负责发送一个分段内的数据。
	 	(7)物理层
	 		将数据的0,1转换为电压和脉冲光传输给物理的传输介质，而相互直连的设备之间使用地址实现传输。
	TCP/IP共有4层
		应用层
		传输层
		网络层
		网络接口层
2)传输方式
	(1)面向有连接型和面向无连接型
	(2)电路交换与分组交换
	(3)单播(Unicast),广播(Boradcast),多播(Multicast),任播(Anycast)

3)地址 
	mac地址不具有分层性，IP地址具有分层，类似于电话号码字段
	MAC寻址所参考的表叫地址转发表，IP寻址的表叫路由控制表

4)构成要素
	(1)中继器
		OSI中物理层面延长网络的设备，将电缆传递过来的信号通过中继器传给另一个电缆
	(2)网桥/2层交换机
		数据链路层面上连接两个网络的设备，能够识别链路层中的数据帧(与分组数据类似)。根据MAC地质进
		行处理。
	(3)路由器/3层交换机
		网络层面上连接两个网络，并对分组报文进行转发的设备，根据IP地质进行处理；可以分担网络负荷。
	(4)4-7层
		处理从传输层到应用层的数据，如负载均衡器的使用
	(5)网关 
		负责协议的转换与数据的转发，在同一种类型的协议之间转发数据叫做应用网关(如代理服务器,
			Proxy Server)


TCP/IP基础
-----------
1)TCP/IP协议群：
	(1)应用协议
		HTTP(HyperText Transfer Protocal,主要格式为HTML);
		SMTP(Simple Mail Transfer Protocal);
		TELNET(TELetypewriter NETwork);
		SNMP(Simple Network Management Protocal,属于应用层协议;MIB-Management Information Base,表示层)
	(2)传输协议
		TCP,UDP 
	(3)网际协议
		IP(分组交换协议的一种，不具备重发机制，属于非可靠性传输协议);
		ICMP(Internet Control Message Protocal,诊断网络状态);
		ARP(Address Resolution Protocal,从数据包的IP中解析出MAC地址的一种协议)
	(4)路由控制协议
		RIP,OSPE,BGP
2)通信
	单词解释：
		包--全能性术语
		帧--数据链路层中包的单位
		数据报--IP和UDP等网络层以上的分层中包的单位
		段--TCP数据流中的信息
		消息--应用协议中数据的单位
	发送数据包过程
	(1)应用程序处理
		写邮件，使用编码格式(表示层)，一次性发还是分发(会话层)，建立TCP连接
	(2)TCP模块处理
			TCP根据指示负责建立连接，发送数据以及断开连接。为实现这一功能，需要在应用层数据的前端
		附加一个TCP首部。首部包括源端口号和目标端口号，序号(类型，发送的包中哪部分是数据)以及效验。
		最后将附加了TCP的包再发给IP。
	(3)IP模块处理
			IP将TCP首部和TCP数据合起来当做自己的数据，并在TCP首部前端加上IP的首部。IP包生成后，参考路由控制表决定
		接受此IP包的路由或主机。
	(4)网络接口(以太网驱动)处理
			给IP传过来的数据附加上以太网首部并进行发送处理。以太网首部中包含接收端MAC地址，发
		送端MAC地址以=以及以太网数据的协议
	以太网用MAC地址，IP用IP地址，TCP/UDP则会用端口号作为标识两端主机的地址。

	分层中包的结构详细看截图。
	
	(5)网络接口(以太网)处理
			首先查看包首部MAC地址是否为自己的。从首部类型得到数据传输类型，根据数据类型传递给
		响应的子程序。
	(6)IP模块处理
			IP模块包得到IP包首部和之后的数据。得到协议类型，若为TCP就将IP包首部之后的数据传递给
		TCP进行处理。若有路由的话，则根据路由控制表发送给相应路由或主机。
	(7)TCP模块处理 
			进行校验和，判断数据是否被损坏。检查端口号，确定具体的应用程序。接收端收到数据后
		会回执一个信息给发送端，若信息未能到发送端，则发送端会认为并没有接收到数据，而一直重复发送数据
		操作。
	(8)应用程序处理 
		解析打包的数据。



数据链路 
--------
1)共享介质型网络
	争用方式(Contention),也叫CSMA(载波监听多路访问)；
	令牌传递方式。
2)非共享介质网络
	发送端与接收端不共享通信介质。
3)根据MAC地址转发
	使用转发表(Forwarding Table)


以太网 
------
以太网帧格式
		以太网前端有一个叫前导码(Preamble)的部分，表示一个以太网帧的开始，也是对端网卡能够与其保持
	同步的标志，前导码末端叫做SFD(Start Frame Delimiter)的域，值为11.前导码占据8个字节，SFD
	之后为以太网帧的本体。
		以太网帧前端为以太网首部，共占14个字节。分别为6个字节的目标MAC地址，6个字节的源MAC地址以及
	连个字节的上层协议类型。
		帧尾叫做FCS(Frame Check Sequence,帧检验序列，4个字节)




IP 
---
	相当于OSI的第三层，网络层的主要作用是实现终端节点之间的通信。
	IP的作用就是在复杂的网络环境中将数据包发给最终的目标地址。
IP大致分为三大作用模块：IP寻址，路由(最终节点为止的转发)，IP分包与组包

IP为面向无连接，为保证数据完整，上一层的TCP为面向有连接。

IP地址由网络标识(网络地址)和主机标识(主机地址)组成。

1)地址分类
	IP地址分为四个级别，分别为A,B,C,D。根据IP中第一位到第四位的比特值对其网络标识和主机分类
	(1)A
			地址是以0开始，第一位到第8位是网络标识。用十进制的话就是 0.0.0.0-127.0.0.0,A类
		地址的后24位相当于主机标识
	(2)B 
		地址以10开始，前16位为网络标识，十进制表示为 128.0.0.0-191.255.0.0
	(3)C 
		地址以前三位110开始，第一位到24位为网络标识，十进制表示为 192.168.0.0-239.255.255.0
	(4)D 
			地址以前4位1110开始，第一位到32位为网络标识，十进制为 224.0.0.0-239.255.255.255.D类地址没有主机
		标识，常用于多播。




路由控制 
--------
IP地址的网络部分用于进行路由控制。
默认路由：0.0.0.0/0
主机路由：IP地址/32
环回地址：127.0.0.1 ,也称localhost

	以太网默认MTU是1500字节，因此超过此字节的IP数据报文无法在一个帧中完成，这就需要对IP分片
(IP Fragmentation).经过分片的IP数据报只能由目标主机进行。为了避免出现数据缺失，使用路径MTU
发现。







ARP
----
只需知道IP地址，发送ARP请求包，得到的响应包会自动填充MAC地址。为了减少请求，会映射成ARP
缓存。需要根据MAC地址获取下一个路由器的地址。

RARP(Reverse Address Resolution Protocal)
----
从MAC地址定位IP的一种协议，如将打印机服务器等小型设备接入到网络时经常使用到。


DHCP(Dynamic Host Configuration Protocal)
----
一般路由器充当DHCP服务器功能。DHCP分配地址有两种方法，一种是由DHCP服务器在特定的IP地址中自动
选出一个进行分配。另一种方法是针对MAC地址分配一个固定的IP地址。

IP隧道 
------
在网络层首部增加网络层首部的通信方法叫做IP隧道。例如，为了解决IP6与IP4兼容问题。
TCP是面向连接的，可靠地流协议。流就是指不间断的数据结构，类似于排水管道中的水流。



WWW
---
定义了三个概念：
	1.访问信息的手段与位置(URI,Uniform Resource Identifier,用以标识资源);
		URL(Uniform Rresource Locator)
	2.信息的表现形式(HTML);
	3.信息的转发(HTTP)