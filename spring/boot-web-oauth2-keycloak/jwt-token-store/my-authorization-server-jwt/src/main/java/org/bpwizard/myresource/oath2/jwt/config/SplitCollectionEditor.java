package org.bpwizard.myresource.oath2.jwt.config;

import java.util.Collection;

import org.springframework.beans.propertyeditors.CustomCollectionEditor;

/**
 * Created by ahmed on 21.5.18.
 */
public class SplitCollectionEditor extends CustomCollectionEditor{

    @SuppressWarnings("rawtypes")
	private final Class<? extends Collection> collectionType;
    private final String splitRegex;

    public SplitCollectionEditor(@SuppressWarnings("rawtypes") Class<? extends Collection> collectionType, String splitRegex) {
        super(collectionType, true);
        this.collectionType = collectionType;
        this.splitRegex = splitRegex;
    }

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        if (text == null || text.isEmpty()) {
            super.setValue(super.createCollection(this.collectionType, 0));
        } else {
            super.setValue(text.split(splitRegex));
        }
    }
}
