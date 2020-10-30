package patterns.structrual.decorator;

public class DecoratorPatternDemo {

    public static void main(String[] args) {
        // christmas tree with just one Garland
        ChristmasTree tree1 = new Garland(new ChristmasTreeImpl());
        System.out.println(tree1.decorate());

        // christmas tree with two Garlands and one Bubble lights
        ChristmasTree tree2 = new BubbleLights(new Garland(new Garland(new ChristmasTreeImpl())));
        System.out.println(tree2.decorate());

    }

}