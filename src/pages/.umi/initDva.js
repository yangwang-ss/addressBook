import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'global', ...(require('C:/项目包/项目包/2019-react-Project/antdesign-pro/my-project/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('C:/项目包/项目包/2019-react-Project/antdesign-pro/my-project/src/models/list.js').default) });
app.model({ namespace: 'login', ...(require('C:/项目包/项目包/2019-react-Project/antdesign-pro/my-project/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('C:/项目包/项目包/2019-react-Project/antdesign-pro/my-project/src/models/menu.js').default) });
app.model({ namespace: 'project', ...(require('C:/项目包/项目包/2019-react-Project/antdesign-pro/my-project/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('C:/项目包/项目包/2019-react-Project/antdesign-pro/my-project/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('C:/项目包/项目包/2019-react-Project/antdesign-pro/my-project/src/models/user.js').default) });
