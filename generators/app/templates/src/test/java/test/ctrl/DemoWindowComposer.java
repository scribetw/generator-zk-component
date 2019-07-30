package test.ctrl;

import <%=package%>.<%=name%>;

import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.event.Event;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Listen;
import org.zkoss.zk.ui.select.annotation.Wire;

public class DemoWindowComposer extends SelectorComposer<Component> {
	@Wire
	private <%=name%> myComp;

	public void doAfterCompose(Component comp) throws Exception {
		super.doAfterCompose(comp);
		myComp.setText("Hello ZK Component!! Please click me.");
	}

	@Listen("onFoo=#myComp")
	public void handleOnFoo(Event event) {
		alert("You listen onFoo: " + event.getTarget());
	}
}
