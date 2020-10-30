package patterns.structrual.facade;

public class FacadeDemo {
	public static void main(String argc[]) {
		CarEngineFacade facade = new CarEngineFacade();
		facade.startEngine();
		facade.stopEngine();
	}
}
