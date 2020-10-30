import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
public class SE {
	public static void main(String argc[]) throws ScriptException {
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName("javascript");
		engine.put("k", 1728);
		Object result = engine.eval("k + 1");
		
		System.out.println("resultxxx:" + result);
//		
////		Bindings scope = engine.createBindings();
////		scope.put("b", new JButton());
////		engine.eval(scriptString, scope);
//		
//		
		Object param = engine.getFactory().getParameter("THREADING");
		
		System.out.println("script param:" + param);
		
		
		for (ScriptEngineFactory factory: manager.getEngineFactories()) {
			System.out.println("factory param:" + factory.getEngineName() + "/" + factory.getLanguageName() + "/" + factory.getParameter("THREADING"));
		}
		
	}
}
