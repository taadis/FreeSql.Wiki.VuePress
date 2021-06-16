(self.webpackChunkFreeSql_Wiki_VuePress=self.webpackChunkFreeSql_Wiki_VuePress||[]).push([[9950],{3241:(n,s,a)=>{"use strict";a.r(s),a.d(s,{data:()=>p});const p={key:"v-6dc1ceac",path:"/guide/filters.html",title:"过滤器",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"临时禁用",slug:"临时禁用",children:[]},{level:2,title:"过滤与验证",slug:"过滤与验证",children:[]},{level:2,title:"全局过滤器",slug:"全局过滤器",children:[]}],filePathRelative:"guide/filters.md",git:{createdTime:1623862569e3,updatedTime:1623862569e3,contributors:[]}}},4774:(n,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});const p=(0,a(6252).uE)('<h1 id="过滤器"><a class="header-anchor" href="#过滤器">#</a> 过滤器</h1><p>FreeSql 基础层实现了 Select/Update/Delete 可设置的全局过滤器功能。</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">AsyncLocal<span class="token punctuation">&lt;</span>Guid<span class="token punctuation">&gt;</span></span> TenantId <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AsyncLocal<span class="token punctuation">&lt;</span>Guid<span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\nfsql<span class="token punctuation">.</span>GlobalFilter\n    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Apply</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>TestAddEnum<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;test1&quot;</span><span class="token punctuation">,</span> a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>Id <span class="token operator">==</span> TenantId<span class="token punctuation">.</span>Value<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Apply</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AuthorTest<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;test2&quot;</span><span class="token punctuation">,</span> a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>Id <span class="token operator">==</span> <span class="token number">111</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Apply</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AuthorTest<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;test3&quot;</span><span class="token punctuation">,</span> a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>Name <span class="token operator">==</span> <span class="token string">&quot;11&quot;</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ApplyIf</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>TestAddEnum<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;test4&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> TenantId<span class="token punctuation">.</span>Value <span class="token operator">!=</span> Guid<span class="token punctuation">.</span>Empty<span class="token punctuation">,</span> a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>Id <span class="token operator">==</span> TenantId<span class="token punctuation">.</span>Value<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">//1.9.0 ApplyIf 委托的返回值(第二个参数) true 才生效</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Apply 泛型参数可以设置为任何类型，当使用 Select/Update/Delete 方法时会进行过滤器匹配尝试（try catch）：</p><ul><li>匹配成功的，将附加 where 条件；</li><li>匹配失败的，标记下次不再匹配，避免性能损耗；</li></ul><p>如何禁用？</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code>fsql<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>TestAddEnum<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//所有生效</span>\nfsql<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>TestAddEnum<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">DisableGlobalFilter</span><span class="token punctuation">(</span><span class="token string">&quot;test1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//禁用 test1</span>\nfsql<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Select</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>TestAddEnum<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">DisableGlobalFilter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//禁用所有</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>fsql.Update/Delete 方法效果同上。</p><h1 id="仓储过滤器"><a class="header-anchor" href="#仓储过滤器">#</a> 仓储过滤器</h1><blockquote><p>注意：仓储过滤器属于早期功能，如果 fsql.GlobalFilter 够用的话，可以跳过以下内容。</p></blockquote><p>FreeSql.Repository 也实现了过滤器功能，它在查询时过滤，删除/修改/插入篇还会进行验证数据，避免数据安全问题。</p><blockquote><p>注意：仓储的过滤器与 IFreeSql.GlobalFilter 不是一个功能，可以同时生效。</p></blockquote><blockquote><p>推荐使用 IFreeSql.GlobalFilter。仓储过滤器在早期出的功能，会一直保留。</p></blockquote><p>每个仓储实例都有 IDataFilter 属性，可利用其完成过滤器管理，它是独立的修改后不影响全局。</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IDataFilter<span class="token punctuation">&lt;</span>TEntity<span class="token punctuation">&gt;</span></span> <span class="token keyword">where</span> <span class="token class-name">TEntity</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">class</span></span> <span class="token punctuation">{</span>\n    <span class="token return-type class-name">IDataFilter<span class="token punctuation">&lt;</span>TEntity<span class="token punctuation">&gt;</span></span> <span class="token function">Apply</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filterName<span class="token punctuation">,</span> <span class="token class-name">Expression<span class="token punctuation">&lt;</span>Func<span class="token punctuation">&lt;</span>TEntity<span class="token punctuation">,</span> <span class="token keyword">bool</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> filterAndValidateExp<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token return-type class-name">IDisposable</span> <span class="token function">Enable</span><span class="token punctuation">(</span><span class="token keyword">params</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> filterName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token return-type class-name">IDisposable</span> <span class="token function">EnableAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token return-type class-name">IDisposable</span> <span class="token function">Disable</span><span class="token punctuation">(</span><span class="token keyword">params</span> <span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> filterName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token return-type class-name">IDisposable</span> <span class="token function">DisableAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">IsEnabled</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> filterName<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="临时禁用"><a class="header-anchor" href="#临时禁用">#</a> 临时禁用</h2><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token punctuation">(</span>repo1<span class="token punctuation">.</span>DataFilter<span class="token punctuation">.</span><span class="token function">Disable</span><span class="token punctuation">(</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">//在这段中，repo1 之 test 过滤器失效</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">//repo1 之 test 过滤器重新生效</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="过滤与验证"><a class="header-anchor" href="#过滤与验证">#</a> 过滤与验证</h2><p>假设我们有User(用户)、Topic(主题)两个实体，在领域类中定义了两个仓储：</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> userRepository <span class="token operator">=</span> fsql<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetGuidRepository</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>User<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name"><span class="token keyword">var</span></span> topicRepository <span class="token operator">=</span> fsql<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetGuidRepository</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Topic<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>在开发过程中，总是担心 topicRepository 的数据安全问题，即有可能查询或操作到其他用户的主题。因此我们在v0.0.7版本进行了改进，增加了 filter lambda 表达式参数。</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> userRepository <span class="token operator">=</span> fsql<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetGuidRepository</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>User<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>Id <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token class-name"><span class="token keyword">var</span></span> topicRepository <span class="token operator">=</span> fsql<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetGuidRepository</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Topic<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>UserId <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>在查询/修改/删除时附加此条件，从而达到不会修改其他用户的数据；</li><li>在添加时，使用表达式验证数据的合法性，若不合法则抛出异常；</li></ul><h2 id="全局过滤器"><a class="header-anchor" href="#全局过滤器">#</a> 全局过滤器</h2><p>全局过滤器，可帮助实现“软删除”、“租户”等设计，目前使用 AspNetCore 注入的方式实现的全局过滤器。</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ConfigureServices</span><span class="token punctuation">(</span><span class="token class-name">IServiceCollection</span> services<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    \n    services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddSingleton</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IFreeSql<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>Fsql<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    services<span class="token punctuation">.</span><span class="token function">AddFreeRepository</span><span class="token punctuation">(</span>filter <span class="token operator">=&gt;</span> filter\n        <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Apply</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ISoftDelete<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;SoftDelete&quot;</span><span class="token punctuation">,</span> a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>IsDeleted <span class="token operator">==</span> <span class="token boolean">false</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Apply</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ITenant<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;Tenant&quot;</span><span class="token punctuation">,</span> a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>TenantId <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Apply</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>ITenant<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&quot;Song&quot;</span><span class="token punctuation">,</span> a <span class="token operator">=&gt;</span> a<span class="token punctuation">.</span>TenantId <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>\n        <span class="token punctuation">,</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">GetType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Assembly\n    <span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>比 abpvnext 还要方便，因为 abp 的相关实体需要实现接口 ISoftDelete、ITenant；</p><p>我们没有这个限制，只要过滤器的表达式解析成功，就算可用；</p><p>使用在任何实体上的时候，只要 [实体].IsDeleted == false 能解析能过，就算可用；</p><div class="language-csharp ext-cs line-numbers-mode"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">xxxx</span> <span class="token punctuation">{</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Song</span> <span class="token punctuation">{</span>\n    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Column</span><span class="token attribute-arguments"><span class="token punctuation">(</span>IsIdentity <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Title <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token comment">//在控制器使用</span>\n<span class="token keyword">public</span> <span class="token function">SongsController</span><span class="token punctuation">(</span><span class="token class-name">IBaseRepository<span class="token punctuation">&lt;</span>Song<span class="token punctuation">&gt;</span></span> repo1<span class="token punctuation">,</span> <span class="token class-name">IBaseRepository<span class="token punctuation">&lt;</span>xxxx<span class="token punctuation">&gt;</span></span> repos2<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">//在此打断点，调试</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>第一次请求：</p><p>repo1.Select.ToSql()</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;SELECT a.&quot;Id&quot;, a.&quot;Title&quot;  FROM &quot;Song&quot; a WHERE (a.&quot;Title&quot; = strftime(&#39;%Y-%m-%d %H:%M.%f&#39;,datetime(current_timestamp,&#39;localtime&#39;)) || 21)&quot;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>repos2.Select.ToSql()</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;SELECT a.&quot;Id&quot;  FROM &quot;xxxx&quot; a&quot;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>第二次请求：</p><p>repo1.Select.ToSql()</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;SELECT a.&quot;Id&quot;, a.&quot;Title&quot;  FROM &quot;Song&quot; a  WHERE (a.&quot;Title&quot; = strftime(&#39;%Y-%m-%d %H:%M.%f&#39;,datetime(current_timestamp,&#39;localtime&#39;)) || 4)&quot;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>repos2.Select.ToSql()</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&quot;SELECT a.&quot;Id&quot;  FROM &quot;xxxx&quot; a&quot;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>//禁用过滤器 repo1.DataFilter.Disable(&quot;test&quot;)</p><p>repo1.Select.ToSql()</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> &quot;SELECT a.&quot;Id&quot;, a.&quot;Title&quot;  FROM &quot;Song&quot; a&quot;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>1、注入的变量值在使用时有了动态变化，每次获取时都是新的（Thread.CurrentThread.ManagedThreadId）；</p><p>2、设定的全局过滤，若某实体不存在表达式函数中的字段时，不会生效（如上xxxx不存在Title）；</p><p>3、使用 DataFilter.Disable(&quot;test&quot;) 可临时关闭过滤器的效果，使用 DataFilter.Enable(&quot;test&quot;) 可重新开启；</p><p>4、仓储对象创建时，从全局过滤器copy进来，然后自己管理自己。修改后不影响其他或全局设置。</p>',47),t={render:function(n,s){return p}}}}]);