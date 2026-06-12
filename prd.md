# EasyTuner 项目PRD（MVP版本）

## 一、项目概述

### 项目名称

EasyTuner

### 项目定位

EasyTuner 是一个面向英语市场的在线乐器调音平台。

第一阶段聚焦 Guitar Tuner（在线吉他调音器），通过工具型SEO获取自然搜索流量。

后续逐步扩展：

* Bass Tuner（贝斯调音器）
* Ukulele Tuner（尤克里里调音器）
* Violin Tuner（小提琴调音器）
* Mandolin Tuner（曼陀林调音器）
* Banjo Tuner（班卓琴调音器）

最终形成完整的 Instrument Tuner Platform（在线乐器调音平台）。

---

# 二、项目目标

## MVP阶段目标

获取以下关键词流量：

核心词：

* guitar tuner
* online guitar tuner
* guitar tuner online

长尾词：

* drop d tuner
* drop c tuner
* open g tuner
* dadgad tuner
* guitar tuning chart
* guitar tuning frequencies

---

# 三、技术方案

## 前端框架

* Next.js 15
* TypeScript
* Tailwind CSS
* App Router

原因：

* SEO友好
* 支持SSG
* 部署简单
* 性能优秀

---

## 部署方案

部署平台：

Cloudflare Pages

特点：

* 免费
* 全球CDN
* 自动HTTPS
* 支持Git自动部署

---

## 数据存储

MVP阶段无需数据库。

所有调弦配置使用JSON文件管理。

示例：

{
"instrument": "guitar",
"slug": "drop-d",
"name": "Drop D",
"notes": [
"D2",
"A2",
"D3",
"G3",
"B3",
"E4"
]
}

---

## 音频处理

使用：

Web Audio API

实现：

* 麦克风采集
* 音高识别
* 实时频率分析

---

## 音高识别

推荐方案：

Pitchy

功能：

* 获取当前频率
* 获取当前音符
* 获取偏差值（Cent）

示例：

当前音符：

E2

当前频率：

82.6Hz

状态：

* Flat（偏低）
* In Tune（准确）
* Sharp（偏高）

---

## 参考音播放

使用：

OscillatorNode

实时生成标准频率。

不使用MP3文件。

优势：

* 无版权风险
* 无需存储
* 加载速度快

支持：

* 单个音播放
* 全部音依次播放

---

# 四、网站结构

## 首页

URL

/

首页即：

Online Guitar Tuner

不单独创建：

/guitar-tuner

避免内容重复。

---

首页目标关键词：

* guitar tuner
* online guitar tuner
* guitar tuner online

---

首页模块

### Hero区域

标题：

Online Guitar Tuner

副标题：

Tune Your Guitar Instantly Using Your Microphone

按钮：

Start Tuning

---

### 调音器工具区

核心功能：

* 麦克风授权
* 音高检测
* 调音反馈

---

### 调弦方式选择器

支持：

* Standard
* Drop D
* Drop C
* Open G
* DADGAD

用户切换后：

实时更新目标音符。

---

### Guitar Tuning Chart

展示：

标准调弦音符

E A D G B E

---

### FAQ

例如：

* How does an online guitar tuner work?
* Is this guitar tuner free?
* Can I tune an acoustic guitar online?

---

### 热门调弦方式

内部链接：

* Drop D Tuner
* Drop C Tuner
* Open G Tuner
* DADGAD Tuner

---

# 五、调弦方式页面

## 页面定位

用于获取长尾SEO流量。

不是文章页。

本质上仍然是工具页。

---

URL结构

/guitar-tunings/standard

/guitar-tunings/drop-d

/guitar-tunings/drop-c

/guitar-tunings/open-g

/guitar-tunings/dadgad

---

页面目标

示例：

/guitar-tunings/drop-d

目标关键词：

* drop d tuner
* drop d guitar tuner
* online drop d tuner

---

页面内容结构

### H1

Drop D Guitar Tuner

---

### 调音器工具

自动加载：

Drop D

音符：

D A D G B E

---

### 音符表

| String | Note |
| ------ | ---- |
| 6      | D2   |
| 5      | A2   |
| 4      | D3   |
| 3      | G3   |
| 2      | B3   |
| 1      | E4   |

---

### 频率表

显示：

每根弦对应频率。

---

### 参考音播放

支持逐根试听。

---

### FAQ

例如：

What is Drop D Tuning?

How do I tune to Drop D?

Why use Drop D tuning?

---

### Related Tunings

内部链接：

* Standard
* Drop C
* Open G
* DADGAD

---

# 六、其他乐器页面

MVP阶段上线：

## Bass Tuner

/bass-tuner

---

## Ukulele Tuner

/ukulele-tuner

---

## Violin Tuner

/violin-tuner

---

页面结构与首页保持一致。

区别：

默认音符不同。

---

# 七、Guide内容体系

目录：

/guides

作用：

建立主题权威。

辅助SEO。

---

首批内容

## How to Tune a Guitar

/guides/how-to-tune-a-guitar

---

## Guitar String Frequencies

/guides/guitar-string-frequencies

---

## Standard Guitar Tuning

/guides/standard-guitar-tuning

---

## Drop D vs Standard

/guides/drop-d-vs-standard

---

要求：

* Evergreen Content
* 长期有效
* 不做新闻内容

---

# 八、SEO要求

每个页面必须具备：

* 唯一Title
* 唯一Meta Description
* 唯一H1
* Canonical
* Open Graph
* FAQ Schema

---

自动生成：

sitemap.xml

robots.txt

---

# 九、性能要求

目标：

Lighthouse ≥ 95

Core Web Vitals 达标

---

要求：

* 图片懒加载
* SSG静态生成
* 减少客户端JS
* 避免大型依赖库

---

# 十、未来扩展规划

第二阶段：

Bass Tunings

* Standard
* Drop D
* 5 String Standard

---

第三阶段：

Ukulele Tunings

* Standard
* Low G
* Baritone

---

第四阶段：

Mandolin

Banjo

Cello

---

第五阶段：

构建完整乐器调弦数据库。

形成：

EasyTuner = Online Instrument Tuner Platform
