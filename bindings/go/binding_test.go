package tree_sitter_Bend_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-Bend"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_Bend.Language())
	if language == nil {
		t.Errorf("Error loading Bend grammar")
	}
}
